"""
Script to run the Django development server
"""
import os
import subprocess
import sys

def run_server():
    """Run Django development server"""
    print("Starting Django development server...")
    
    # Change to the Django project directory
    os.chdir('django-backend')
    
    # Run migrations
    print("Running migrations...")
    subprocess.run([sys.executable, 'manage.py', 'migrate'])
    
    # Create initial data
    print("Setting up initial data...")
    subprocess.run([sys.executable, '../setup_database.py'])
    
    # Start the server
    print("Starting server on http://127.0.0.1:8000")
    subprocess.run([sys.executable, 'manage.py', 'runserver', '0.0.0.0:8000'])

if __name__ == '__main__':
    run_server()
