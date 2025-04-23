# GatorPulse | CEN3031 Project
Group 17865-5 project for cen3031

Add .env file to gatorpulse/.env with the following fields:
GOOGLE_API= a key with google maps API access
FLASK_SECRET= a secret key for Flask
VITE_GOOGLE_MAPS_KEY= a key with google maps API access

Add Service key file servicekey.json to gatorpulse/servicekey.json with a valid servicekey.json firebase file.

Run npm install from the gatorpulse/ directory to install the required packages.

Run pip3 install -r requirements.txt in the gatorpulse directory to install python packages.

Run the Flask server from the project's root with venv: python gatorpulse/src/main.py

Run the Vite app from the gatorpulse directory with npm run dev

The website should then be accessible at https://localhost:5173.
