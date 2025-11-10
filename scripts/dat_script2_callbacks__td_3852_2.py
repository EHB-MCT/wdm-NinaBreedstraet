import datetime
import requests

def send_data():
    url = 'https://wdm-ninabreedstraet-2.onrender.com/people'
    mediapipe_chop = op('select1')
    
    payload = {
        "time": datetime.datetime.now().isoformat(),
        "x": str(mediapipe_chop['tx'].eval()),
        "y": mediapipe_chop['ty'].eval(),
        "z":  mediapipe_chop['tz'].eval()
    }
    myobj = {'somekey': 'somevalue'}
    x = requests.post(url, json = json.dump(payload))
    print(x.text)

    return



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
