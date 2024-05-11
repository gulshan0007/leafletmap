import requests

def fetch_weather_data(latitude, longitude, api_key):
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        print("Error fetching weather data:", response.status_code)
        return None

api_key = '55661fd40ec6eabb4c02e644cf4b74d2'

latitude = 19.1303
longitude = 72.9188
weather_data = fetch_weather_data(latitude, longitude, api_key)
print(weather_data)