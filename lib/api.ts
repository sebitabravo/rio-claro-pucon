const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired, try to refresh
        await this.refreshToken()
        // Retry the request
        return this.request(endpoint, options)
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  async login(username: string, password: string) {
    const response = await fetch(`${this.baseURL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      throw new Error("Login failed")
    }

    const data = await response.json()
    this.token = data.access

    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", data.access)
      localStorage.setItem("refresh_token", data.refresh)
    }

    return data
  }

  async refreshToken() {
    const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null

    if (!refreshToken) {
      throw new Error("No refresh token available")
    }

    const response = await fetch(`${this.baseURL}/auth/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    })

    if (!response.ok) {
      // Refresh token is invalid, redirect to login
      this.logout()
      throw new Error("Token refresh failed")
    }

    const data = await response.json()
    this.token = data.access

    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", data.access)
    }

    return data
  }

  logout() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
    }
  }

  // Sensors API
  async getSensors() {
    return this.request("/sensors/sensors/")
  }

  async getSensor(id: string) {
    return this.request(`/sensors/sensors/${id}/`)
  }

  async getSensorReadings(sensorId: string, hours = 24) {
    return this.request(`/sensors/sensors/${sensorId}/readings/?hours=${hours}`)
  }

  async getSensorStatistics(sensorId: string, days = 7) {
    return this.request(`/sensors/sensors/${sensorId}/statistics/?days=${days}`)
  }

  async getDashboardSummary() {
    return this.request("/sensors/sensors/dashboard_summary/")
  }

  async getLatestReadings() {
    return this.request("/sensors/readings/latest/")
  }

  // Alerts API
  async getAlerts() {
    return this.request("/alerts/alerts/")
  }

  async getActiveAlerts() {
    return this.request("/alerts/alerts/active/")
  }

  async getAlertsSummary() {
    return this.request("/alerts/alerts/summary/")
  }

  async acknowledgeAlert(alertId: number) {
    return this.request(`/alerts/alerts/${alertId}/acknowledge/`, {
      method: "POST",
    })
  }

  async resolveAlert(alertId: number) {
    return this.request(`/alerts/alerts/${alertId}/resolve/`, {
      method: "POST",
    })
  }

  // Users API
  async getCurrentUser() {
    return this.request("/users/users/me/")
  }

  async getUsers() {
    return this.request("/users/users/")
  }

  // Reports API
  async getReports() {
    return this.request("/reports/reports/")
  }

  async createReport(reportData: any) {
    return this.request("/reports/reports/", {
      method: "POST",
      body: JSON.stringify(reportData),
    })
  }

  async downloadReport(reportId: number) {
    const response = await fetch(`${this.baseURL}/reports/reports/${reportId}/download/`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Download failed")
    }

    return response.blob()
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
export default apiClient
