import datetime
import requests
import uuid

def new_uid():
    uid = str(uuid.uuid4())
    parent().store('current_uid', uid)
    debug(f"✨ Nieuwe gebruiker: {uid}")
    return uid

def process_frame():
    face_chop = op('/project1/face_detected')

    sample_value = float(face_chop[0]) if face_chop.numChans > 0 else 0

    threshold = 1e-7
    face_detected = sample_value > threshold

    face_present_previous = parent().fetch('face_prev', False)
    current_uid = parent().fetch('current_uid', None)

    if not face_detected and face_present_previous:
        current_uid = None
        parent().store('current_uid', None)
        debug("Gezicht weg → UID gereset")

    if face_detected and not face_present_previous:
        current_uid = new_uid()


    parent().store('face_prev', face_detected)

    debug(f"sample_value={sample_value:.8f}, face_detected={face_detected}, current_uid={current_uid}")

    return current_uid


def send_data(current_uid):
    url = 'http://localhost:3000/people'
    mediapipe_chop = op('')

    data = {}
    if mediapipe_chop.numChans > 0:
        for i in range(mediapipe_chop.numChans):
            chan_name = mediapipe_chop[i].name
            try:
                data[chan_name] = float(mediapipe_chop[chan_name][0])
            except Exception as e:
                data[chan_name] = None
                debug(f"Error reading {chan_name}: {e}")

    payload = {
        "time": datetime.datetime.now().isoformat(),
        "uid": current_uid,
        "mediapipe": data
    }

    try:
        res = requests.post(url, json=payload)
        debug(f" Sent {len(data)} values → {res.status_code}")
    except Exception as e:
        debug(f"Error sending data: {e}")

def onCook(dat):
    current_uid = process_frame()
    send_data(current_uid)

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