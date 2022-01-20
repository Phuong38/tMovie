from pymongo.message import insert
import requests
import json
import pymongo


myclient = pymongo.MongoClient("mongodb+srv://user:pass@cluster0.omkzd.mongodb.net/tMovie?retryWrites=true&w=majority")
mydb = myclient['tMovie']
myMovies = mydb['movies']
myGenres = mydb['genres']
myCredit = mydb['credits']
myVideo = mydb['videos']


myTvs = mydb['tvs']
myTvGenres = mydb['genretvs']
myTvCredit = mydb['credittvs']
myTvVideo = mydb['videotvs']

# response = requests.get("http://localhost:5000/api/user")
localhost = 'http://localhost:5000/api/genre/create'
tmdListGenre = 'https://api.themoviedb.org/3/genre/movie/list'
tmdListTVGenre = 'https://api.themoviedb.org/3/genre/tv/list'
tmdUrl = 'https://api.themoviedb.org/3/movie/popular'
tmdTVUrl = 'https://api.themoviedb.org/3/tv/popular'
token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTg1YzQwZjI4NWZlZjZhMjczOTg0YjA4YzM4MzkwZCIsInN1YiI6IjYxZDQwMTlhYmZlYjhiMDA2NmJjZDhjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tGv0mI1v9Hj0ZHsLVZgcLd7jIHOUWh34_Xy3wtW1OSs'
headers = { 'Authorization': 'Bearer ' + token }


def insert_movies():
    for i in range(3, 50):
        page = {'page': i}
        response = requests.get(tmdUrl, headers=headers, params=page)
        results = response.json()['results']
        for result in results:
            new_movie = {
            'id': result['id'], 
            'title': result['title'],
            'backdrop_path': result['backdrop_path'],
            'poster_path': result['poster_path'],
            'overview': result['overview'],
            'release_date': result['release_date'],
                'vote_averge': result['vote_average'],
                'vote_count': result['vote_count'],
                'popularity': result['popularity'],
                'genres': result['genre_ids']
            }

            try:
                insert_movie = myMovies.insert_one(new_movie)
                print(result['title'])
            except Exception as e:
                print('e')
        
            print(result['id'])


def insert_tvs():
    for i in range(1, 50):
        page = {'page': i}
        response = requests.get(tmdTVUrl, headers=headers, params=page)
        results = response.json()['results']
        for result in results:
            new_movie = {
                'id': result['id'], 
                'name': result['name'],
                'backdrop_path': result['backdrop_path'],
                'poster_path': result['poster_path'],
                'overview': result['overview'],
                'first_air_date': result['first_air_date'],
                'vote_averge': result['vote_average'],
                'vote_count': result['vote_count'],
                'popularity': result['popularity'],
                'genres': result['genre_ids']
            }

            try:
                insert_movie = myTvs.insert_one(new_movie)
                print(result['name'])
            except Exception as e:
                print(e)
        
            print(result['id'])

def insert_genres():
    response = requests.get(tmdListGenre, headers=headers)
    results = response.json()['genres']
    for result in results:
        new_genres = {
            'id': result['id'],
            'name': result['name'],
        }
        print(new_genres)
        try:
            insert_genres = myGenres.insert_one(new_genres)
            print(new_genres['name'])
        except Exception as e:
            print(e)

def insert_tv_genres():
    response = requests.get(tmdListTVGenre, headers=headers)
    results = response.json()['genres']
    for result in results:
        new_genres = {
            'id': result['id'],
            'name': result['name'],
        }
        print(new_genres)
        try:
            insert_genres = myTvGenres.insert_one(new_genres)
            print(new_genres['name'])
        except Exception as e:
            print(e)


def insert_credits():
    movies = myMovies.find()
    for movie in movies:
        idMovie = movie['id']
        print(idMovie)
        tmdCredit = 'https://api.themoviedb.org/3/movie/{}/credits'.format(idMovie)
        tmdPerson = 'https://api.themoviedb.org/3/person/{}'.format(idMovie)
        response = requests.get(tmdCredit, headers=headers)
        results = response.json()['cast']
        for result in results:
            count = 0
            if count > 6:
                return
            idPerson = result['id']
            tmdPerson = 'https://api.themoviedb.org/3/person/{}'.format(idPerson)
            person = requests.get(tmdPerson, headers=headers)
            # print(person.json()['birthday'])
            newCredit = {
                'id': person.json()['id'],
                'name': result['name'],
                'profile_path': result['profile_path'],
                'birthday': person.json()['birthday'],
                'biography': person.json()['biography'],
                'idMovie': idMovie,
            }
            
            try:
                insert_genres = myCredit.insert_one(newCredit)
                print(newCredit['name'])
            except Exception as e:
                print(e)
            count += 1


def insert_tv_credits():
    tvs = myTvs.find()
    for tv in tvs:
        idTV = tv['id']
        print(idTV)
        tmdCredit = 'https://api.themoviedb.org/3/tv/{}/credits'.format(idTV)
        # tmdPerson = 'https://api.themoviedb.org/3/person/{}'.format(idTV)
        response = requests.get(tmdCredit, headers=headers)
        results = response.json()['cast']
        for result in results:
            idPerson = result['id']
            tmdPerson = 'https://api.themoviedb.org/3/person/{}'.format(idPerson)
            person = requests.get(tmdPerson, headers=headers)
            # print(person.json()['birthday'])
            newCredit = {
                'id': person.json()['id'],
                'name': result['name'],
                'profile_path': result['profile_path'],
                'birthday': person.json()['birthday'],
                'biography': person.json()['biography'],
                'idTV': idTV,
            }
            
            try:
                insert_genres = myTvCredit.insert_one(newCredit)
                print(newCredit['name'])
            except Exception as e:
                print(e)


def insert_videos():
    movies = myMovies.find()
    for movie in movies:
        idMovie = movie['id']
        print(idMovie)
        tmdVideo = 'https://api.themoviedb.org/3/movie/{}/videos'.format(idMovie)
        response = requests.get(tmdVideo, headers=headers)
        results = response.json()['results']
        for result in results:
            newVideo = {
                'name': result['name'],
                'key': result['key'],
                'idMovie': idMovie
            }
            
            try:
                insert_genres = myVideo.insert_one(newVideo)
                print(newVideo['name'])
            except Exception as e:
                print(e)


def insert_tv_videos():
    movies = myTvs.find()
    for movie in movies:
        idMovie = movie['id']
        print(idMovie)
        tmdVideo = 'https://api.themoviedb.org/3/tv/{}/videos'.format(idMovie)
        response = requests.get(tmdVideo, headers=headers)
        results = response.json()['results']
        for result in results:
            newVideo = {
                'name': result['name'],
                'key': result['key'],
                'idTV': idMovie
            }
            
            try:
                insert_genres = myTvVideo.insert_one(newVideo)
                print(newVideo['name'])
            except Exception as e:
                print(e)


# insert_tv_genres()
# insert_videos()
# insert_credits()
# insert_tvs()
insert_tv_credits()
# insert_tv_videos()
