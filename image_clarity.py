import imquality.brisque as brisque
import PIL.Image
import sys
import os

try:
    path = './uploads/file'
    img = PIL.Image.open(path)
    print(brisque.score(img))
except BaseException as e:
    print(e)
finally:
    os.remove('uploads/file')
    sys.stdout.flush()