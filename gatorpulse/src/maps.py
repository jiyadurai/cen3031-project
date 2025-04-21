from dotenv import load_dotenv
import os
load_dotenv()
api_key = os.environ.get("API_KEY")
import googlemaps



gmaps = googlemaps.Client(key=api_key)

if __name__ == "__main__":
    address = input("Enter an Address: ")
    res = gmaps.find_place(input=address, input_type='textquery', fields=['place_id'])
    candidates = res.get('candidates')

    if candidates:
        place_id = candidates[0].get('place_id')
        print("Place ID:", place_id)
        res = gmaps.place(place_id=place_id, fields=['name', 'formatted_address'])
        place_name = res.get('result').get('name')
        formatted_address = res.get('result').get('formatted_address')
        print("Place Name:", place_name)
        print("Place Address:", formatted_address)
    else:
        print("No places found")