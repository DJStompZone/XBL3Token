# Bedrock API XBL3.0 Utility

Enables you to quickly and easily retrieve, refresh, and erase your Minecraft Bedrock Realms API token.

![banner](https://i.imgur.com/91yn9Gz.png)

## Installing

- Unzip or clone the project
- Install the project with `npm i` from inside the project directory

## Usage

To get a new token: 
- Run `npm start`
- Copy the device code displayed
- Navigate to https://microsoft.com/link in your web browser of choice (does not need to be on the same device)
- Login to the Microsoft account you want to authorize for the Realms API (most likely the owner of the realm)


To refresh an expired token:
- Run `npm start` again. If your credentials are still saved, it will automatically update your token with a fresh one.


To view a saved token:
- Run `npm decode`
- Your XBL3.0 token will be displayed in the console in plaintext 


To clear all saved tokens and credentials:
- Run `npm erase`
- Type 'y' to confirm
- Press enter
