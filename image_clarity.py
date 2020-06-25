import imquality.brisque as brisque
import PIL.Image
import sys

try:
    path = './uploads/file'
    img = PIL.Image.open(path)
    print(brisque.score(img))
except BaseException as e:
    print(e)
sys.stdout.flush()