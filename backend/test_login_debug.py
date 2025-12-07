import requests

url = "http://127.0.0.1:8000/auth/login"
payload = {
    "email": "admin@agilizacrm.com",
    "password": "admin" 
}
# Try password 'admin123' if 'admin' fails, based on seed data it might be different.
# Seed data usually sets it to 'admin123' or '123456'.
# Let's try to grab a user that exists.

try:
    print(f"Sending request to {url}...")
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print("Response JSON:")
    print(response.json())
except Exception as e:
    print(f"Error: {e}")
