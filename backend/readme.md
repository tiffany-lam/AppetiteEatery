#### IMPORTANT NOTES
- THESE INSTRUCTIONS ONLY WORK FOR LINUX (as far as I know). I will find a way to fully develop our app on windows soon.
- You will still need to update the frontend separately (through the other readme.md inside /frontend).

#### Serving our react app with flask so that we have access to our database (which is connected with flask):

1. Make sure you are in the /backend directory of our project!!!

2. Download the .env file in our google drive.

3. Place the .env at the ROOT of /backend directory, so /backend/.env.

4. Install pip packages (this step is like npm ci for the /frontend directory)

    a. Get into your virtual env with: `. venv/bin/activate`
  
    b. Install packages: `pip install -r requirements.txt`
  
    c. (optional) To check if packages are properly installed in your virtual env: run `pip freeze` and compare the resutls of the command with the contents of requirements.txt.
    
   NOTE: the package `pkg-resources==0.0.0` is neglible, if you see this package inside *requirements.txt*, DELETE IT
   
   OPTIONAL: If you install new packages to our /backend, export them with: `pip freeze >> requirements.txt`
   
   
5. Load all environment variables in the .env file:
    ```
    python config.py
    ```

6. Run our flask app:

    a. Update the frontend: go to /frontend and npm ci (see the readme in /frontend for more details)
    
    b. Build the static files: `sudo npm run build`
    
    c. Copy the /build folder into the root of /backend (so that /backend has /backend/build)
    
    ```
    sudo cp -r <path to the build folder in /frontend> <path to /backend>
    ```
    
    OR if you don't wanna mess with the cli to do this, just copy and paste the build folder using the GUI File Manager.
    
    d. Finally run the flask app **(MAKE SURE YOUR ARE NOW BACK INSIDE /backend)**:
    
    ```
    flask run
    ```
7. To access our frontend: [http://127.0.0.1:5000/](http://127.0.0.1:5000/)

8. To access our api routes http://127.0.0.1:5000/api/whateveryouwant

9. At the time of writing once you complete step 8, you should see a document through MongoDB Compass (inside appetite-eatery-db > test) with 
    ```
    { name: "whateveryouwant"}
    ```
    
