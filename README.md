## Install the development tools
**Confluence:** [Getting Started Guide](http://confluence.adtran.com/display/CloudCore/Getting+Started+Guide)  

You can check if you have Node and npm installed by typing:  
node --version && npm --version && yo --version  

If you already have all of the node.js, yeoman, and angular tools installed, then you only need to do the following.  
1. **npm install**  
2. **bower install**  

Otherwise you will need to install the tools.  
1.  Download nvm  
    **wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash**  
    OR  
    **curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash**  
2.  Activate nvm  
    **exec bash**  
3.  Optional verify nvm is installed.  
    **nvm --version**  
4.  Navigate to the root repo directory.  
5.  Install latest stable Node  
    **nvm install stable**  
6.  Run python install script.  
    **python install_tools.py**  
7.  Start the app.  
    **grunt serve**  

## Build & development

`grunt serve` to preview the App.  
`grunt build` to create a production build. It is placed in the **dist** folder.  
`grunt serve:dist` to preview the production build.  
