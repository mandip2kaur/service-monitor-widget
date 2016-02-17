"""
Creator: Brian Perkins
Date: June 11, 2015
Description: Used to remove development tools for the Firefly client App Development.
"""
import os
import os.path
import sys
import shutil
import subprocess


""" Function to verify tools have been uninstalled! """
def check_install(print_out):
   is_installed = False;
   err1 = "command not found";
   err2 = "sudo apt-get install";
   try:
      output = subprocess.check_output("node --version && npm --version && npm --version && yo --version && bower --version && grunt --version", stderr=subprocess.STDOUT, shell=True);
      err1_found = output.find(err1);
      err2_found = output.find(err2);
      if ((err1_found == -1) and (err2_found == -1)):
         if print_out is True: print "Tools are installed!"
         is_installed = True;
      else:
         if print_out is True:
            print "Error: Failed uninstalling tools.";           
            print output;
   except subprocess.CalledProcessError, e:
       if print_out is True: print "Done: Tools have been removed!\n", e.output   
   
   return is_installed;

""" Main part of script starts here. """
if check_install(False) is True:
   print "Uninstalling tools."
   print " - removing bower_components/."
   output = subprocess.check_output("rm -rf bower_components/", stderr=subprocess.STDOUT, shell=True);
   print " - removing node_modules/."
   output = subprocess.check_output("rm -rf node_modules/", stderr=subprocess.STDOUT, shell=True);
   print " - removing -g grunt-cli."
   output = subprocess.check_output("npm uninstall -g grunt-cli", stderr=subprocess.STDOUT, shell=True);
   print " - removing -g bower."
   output = subprocess.check_output("npm uninstall -g bower", stderr=subprocess.STDOUT, shell=True);
   print " - removing -g yo."
   output = subprocess.check_output("npm uninstall -g yo", stderr=subprocess.STDOUT, shell=True);
   print " - removing -g npm."
   output = subprocess.check_output("npm uninstall -g npm", stderr=subprocess.STDOUT, shell=True);
   print " - removing nvm."
   output = subprocess.check_output("rm -rf ~/.nvm/", stderr=subprocess.STDOUT, shell=True);
   check_install(True);
else:
   print "Done: Tools are not installed. Nothing to do."
