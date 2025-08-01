"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api"

export function useApi<T>(apiCall: () => Promise<T>, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await apiCall()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, dependencies)

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiCall()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}

export function useSensors() {
  return useApi(() => apiClient.getSensors())
}

export function useDashboardSummary() {
  return useApi(() => apiClient.getDashboardSummary())
}

export function useActiveAlerts() {
  return useApi(() => apiClient.getActiveAlerts())
}

export function useAlertsSummary() {
  return useApi(() => apiClient.getAlertsSummary())
}
