import uuid

current_uid = None

def new_user():
    global current_uid
    current_uid = str(uuid.uuid4())
    print("Nieuwe gebruiker aangemaakt:", current_uid)

def get_uid():
    return current_uid