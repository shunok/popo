import os
import string
import json


def ListFilesToTxt(dir,file,wildcard,recursion):
    exts = wildcard.split(" ")
    files = os.listdir(dir)
    for name in files:
        fullname=os.path.join(dir,name)
        if(os.path.isdir(fullname) & recursion):
            # file.write("" + name + "\n")
            file.write("{ name: '" + name + "', cname: '" + name + "', list:[")
            ListFilesToTxt(fullname,file,wildcard,recursion)
        else:
            for ext in exts:
                if(name.endswith(ext)):
                    # file.write(name + "\n")
                    file.write("{file:'" + name + "',},")
                    break
    file.write("]},")


def Trans():
  dir="./zondicons/"
  outfile="imagelist.js"
  wildcard = ".png .svg .jpeg .jpg"
  file = open(outfile,"w")
  if not file:
    print ("cannot open the file %s for writing" % outfile)
  file.write("var imageList = [")
  ListFilesToTxt(dir,file,wildcard, 1)
  file.seek(-2, os.SEEK_END)
  file.truncate()
  file.write(";")
  file.close()

Trans()