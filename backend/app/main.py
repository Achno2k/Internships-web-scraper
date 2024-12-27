from fastapi import FastAPI
from .routes import scrape
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(scrape.router)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def get_root():
    return {"message": "Hello World!"}

