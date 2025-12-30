# Project Documentatie - WDM Nina Breedstraet

## Projectoverzicht

Dit is een TouchDesigner project voor het onderzoeken van reacties van mensen op interactieve installaties. Het project bestaat uit een API-backend, een Vue.js frontend, en Python scripts voor data-verzameling via TouchDesigner.

## Architectuur

- **Backend**: Node.js/Express API met MongoDB database
- **Frontend**: Vue.js 3 met Vite
- **Data Collection**: Python scripts voor TouchDesigner integratie
- **Deployment**: Docker containers

## Projectstructuur

### Root Bestanden

```
├── docker-compose.yml      # Docker configuratie
├── package.json           # Root dependencies
├── Dockerfile             # Backend Docker image
├── .dockerignore          # Docker ignore regels
├── .gitignore            # Git ignore regels
├── README.md             # Project beschrijving
├── LICENSE.md            # Licentie
├── CODE_OF_CONDUCT.md    # Gedragscode
├── CONTRIBUTING.md       # Contributie richtlijnen
└── Standards.md          # Project standaarden
```

### Backend API (`images/api/`)

**Technologie**: Node.js, Express, MongoDB

**Bestanden**:

- `src/app.js` - Hoofdbestand met Express server en API endpoints
- `src/index.js` - Entry point
- `src/Credentials.js` - Database credentials (niet in repo)

**API Endpoints**:

**People Collection** (TouchDesigner data):

- `GET /people` - Haal alle personen data op
- `GET /people/:uid` - Haal data op voor specifieke UID
- `POST /people` - Sla nieuwe persoon data op
- `GET /uids` - Haal alle unieke UIDs op

**Users Collection** (Gebruikers):

- `GET /users` - Haal alle gebruikers op
- `GET /users/:id` - Haal specifieke gebruiker op
- `POST /users` - Maak nieuwe gebruiker aan

**Database**:

- MongoDB Atlas cluster
- Collections: `people` (TouchDesigner data), `objects` (gebruikers)
- Database: `wdmNinaBreedstraetDatabase`

### Frontend (`front_end/front-end-wdm/`)

**Technologie**: Vue.js 3, Vite, Vue Router, Chart.js

**Structuur**:

```
src/
├── components/           # Vue componenten
│   ├── Data.vue         # Data visualisatie
│   ├── RegisterForm.vue # Registratie formulier
│   ├── UID.vue          # UID management
│   ├── User.vue         # Gebruiker component
│   └── UserProfile.vue  # Gebruikersprofiel
├── views/               # Page views
│   ├── DashboardView.vue
│   └── LoginView.vue
├── router/
│   └── index.js         # Vue Router configuratie
├── assets/              # Static assets
├── App.vue              # Hoofd component
├── main.js              # Vue app initialisatie
└── style.css            # Global styles
```

**Dependencies**:

- Vue 3.5.24
- Vue Router 4.6.3
- Chart.js 4.5.1
- Vue-data-ui 3.7.12
- Vite 7.2.2

### Python Scripts (`scripts/`)

**Doel**: TouchDesigner integratie voor data verzameling

**Bestanden**:

- `dat_uid_manager__td_4736_5.py` - UID management voor TouchDesigner
- `dat_keyboardin1_callbacks__td_20001_6.py` - Keyboard input callbacks
- `dat_script2_callbacks__td_3852_2.py` - Script callbacks
- `dat_text1__td_20001_4.txt` - Text data

**UID Manager Functionaliteit**:

- Genereert unieke UUIDs voor nieuwe gebruikers
- Huidige UID tracking
- Print nieuwe UID naar console

## Docker Configuratie

**Services**:

1. **API Service**:

   - Build: Root directory
   - Port: 3000
   - Volume: `./images/api/src:/usr/app/src`

2. **Frontend Service**:
   - Build: `./front_end/front-end-wdm`
   - Port: 5173
   - Volume: `./front_end/front-end-wdm:/usr/src/app`
   - Command: `npm run dev -- --host 0.0.0.0`

## Data Flow

1. **TouchDesigner** → Python scripts genereert UID
2. **Python** → API POST `/people` met interactie data
3. **API** → MongoDB slaat data op
4. **Frontend** → API GET endpoints haalt data op
5. **Frontend** → Chart.js visualiseert data

## Installatie & Setup

1. **Clone repository**:

   ```bash
   git clone <repository-url>
   cd wdm-NinaBreedstraet
   ```

2. **Docker setup**:

   ```bash
   docker-compose up --build
   ```

3. **Manual setup**:
   - Backend: `npm install && npm start`
   - Frontend: `cd front_end/front-end-wdm && npm install && npm run dev`

## Poorten

- API: http://localhost:3000
- Frontend: http://localhost:5173

## Belangrijke Bestanden

### Backend Core (`images/api/src/app.js`)

- Express server configuratie
- MongoDB connection met credentials
- CORS en body-parser middleware
- Alle API endpoints

### Frontend Router (`front_end/front-end-wdm/src/router/index.js`)

- Vue Router setup
- Route definities voor views

### Python UID Manager (`scripts/dat_uid_manager__td_4736_5.py`)

- UUID generatie voor TouchDesigner
- UID state management

## Security

- MongoDB credentials in `Credentials.js` (niet in repo)
- CORS geconfigureerd voor frontend
- Environment variables voor sensitive data

## Development

- Frontend: Vue DevTools ondersteuning
- Hot reload via Vite
- Volume mounts voor live code changes

## Productie

- Docker containers voor deployment
- MongoDB Atlas voor schaalbare database
- Express server voor API hosting
