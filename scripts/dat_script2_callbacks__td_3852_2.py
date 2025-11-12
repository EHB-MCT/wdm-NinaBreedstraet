import datetime
import requests

def send_data():
    url = 'https://wdm-ninabreedstraet-2.onrender.com/people'
    mediapipe_chop = op('/project1/mediapipe_data/select1') 

    mediapipe_chop.cook(force=True)

    data = {}
    for chan in mediapipe_chop.chans():
        try:
            data[chan.name] = float(chan[-1])
        except:
            data[chan.name] = None

    payload = {
        "time": datetime.datetime.now().isoformat(),
        "mediapipe": data
    }

    try:
        res = requests.post(url, json=payload)
        debug(f"Sent {len(data)} values → {res.status_code}")
    except Exception as e:
        debug(f"Error sending data: {e}")


# sources: 
# https://derivative.ca/UserGuide/Working_with_CHOPs_in_Python
# https://docs.derivative.ca/Working_with_OPs_in_Python
# https://derivative.ca/UserGuide/Channel_Class
# https://docs.python.org/3/library/datetime.html
# https://docs.python.org/3/tutorial/datastructures.html
# https://railsware.com/blog/indexing-and-slicing-for-lists-tuples-strings-sequential-types/
# https://www.w3schools.com/python/ref_requests_post.asp#:~:text=The%20post()%20method%20sends,some%20data%20to%20the%20server.
# https://www.w3schools.com/python/ref_func_float.asp 
#
#
# def send_data():
#     url = 'https://wdm-ninabreedstraet-2.onrender.com/people'
#     mediapipe_chop = op('/project1/math1')
    
#     payload = {
#         "time": datetime.datetime.now().isoformat(),
#         "x": mediapipe_chop['chan1'][0],
#         "y": mediapipe_chop['chan2'][0],
#         "z":  mediapipe_chop['chan3'][0]
#     }
#     x = requests.post(url, json=payload)
#     print(x.text)

#     return



# def send_data():
#     mediapipe_chop = op('select1')

#     # lees eerste sample uit
#     try:
#         x = mediapipe_chop['tx'][0]
#         y = mediapipe_chop['ty'][0]
#         z = mediapipe_chop['tz'][0]   
#     except Exception as e:
#         debug(f"❌ Kan tx/ty/tz niet vinden: {e}")
#         return

#     payload = {
#         "time": datetime.datetime.now().isoformat(),
#         "x": float(x),
#         "y": float(y),
#         "z": float(z)
#     }

#     url = 'https://wdm-ninabreedstraet-2.onrender.com/people'
#     try:
#         req = urllib.request.Request(url, data=json.dumps(payload).encode(), headers={'Content-Type': 'application/json'})
#         with urllib.request.urlopen(req) as res:
#             debug(f"✅ Sent data: {payload} → {res.status}")
#     except Exception as e:
#         debug(f"❌ Error sending data: {e}")

def onCook(dat):
    send_data()
    return
