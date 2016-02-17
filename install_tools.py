"""
Creator: Brian Perkins
Date: June 11, 2015
Description: Used to install development tools for the Firefly client App Development.

You must perform the following 3 steps before running this script.
"""
import os
import os.path
import sys
import shutil
import subprocess


""" Function to verify tools are correctly installed! """
def check_install(print_out):
   is_installed = False;
   err1 = "command not found";
   err2 = "sudo apt-get install";
   try:
      output = subprocess.check_output("node --version && npm --version && npm --version && yo --version && bower --version && grunt --version", stderr=subprocess.STDOUT, shell=True);
      err1_found = output.find(err1);
      err2_found = output.find(err2);
      if ((err1_found == -1) and (err2_found == -1)):
         if print_out is True: print output
         if print_out is True: print "Done: Global tools are successfully installed!"
         is_installed = True;
      else:
         if print_out is True:
            print "Error: Failed installing tools.";
            print "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
            print "You must perform the following 3 steps before running this script."
            print "1. Download nvm"
            print "2. Activate nvm 'exec bash'"
            print "3. nvm install stable"
            print "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
            print output;
   except subprocess.CalledProcessError, e:
       if print_out is True:
          print "Error: Failed installing tools.\n", e.output
          print "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
          print "You must perform the following 3 steps before running this script."
          print "1. Download nvm"
          print "2. Activate nvm 'exec bash'"
          print "3. nvm install stable"
          print "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"

   return is_installed;

""" Main part of script starts here. """
if check_install(False) is False:
   print "Installing global tools."
   print " - installing yo -g."
   output = subprocess.check_output("npm install -g yo", stderr=subprocess.STDOUT, shell=True);
   print " - installing bower -g."
   output = subprocess.check_output("npm install -g bower", stderr=subprocess.STDOUT, shell=True);
   print " - installing grunt-cli -g."
   output = subprocess.check_output("npm install -g grunt-cli", stderr=subprocess.STDOUT, shell=True);
   check_install(True);
   print "Installing local tools."
   print " - npm install."
   output = subprocess.check_output("npm install", stderr=subprocess.STDOUT, shell=True);
   print "Done: Enter 'grunt serve' to start app."
else:
   print "Done: Tools are already installed. Nothing to do."

