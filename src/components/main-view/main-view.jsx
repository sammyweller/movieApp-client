import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view"

export const MainView = () => {
    const [movies, setMovies] = useState([
        {   
            id: 1, 
            title: "Howl's Moving Castle",
            description: "When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle.",
            genre: {
                name: "Fantasy",
                description: "Fantasy film is a genre that incorporates imaginative and fantastic themes."
            },
            director: {
                name: "Hayao Miyazaki",
                bio: "Hayao Miyazaki is a Japanese animator, filmmaker, and manga artist.",
                birth: "1941"
            }, 
            imagePath: "https://flxt.tmsimg.com/NowShowing/46617/46617_aa.jpg" 
        },
        {   
            id: 2, 
            title: "Spirited Away",
            description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches and spirits, a world where humans are changed into beasts.",
            genre: {
                name: "Fantasy",
                description: "Fantasy film is a genre that incorporates imaginative and fantastic themes."
            },
            director: {
                name: "Hayao Miyazaki",
                bio: "Hayao Miyazaki is a Japanese animator, filmmaker, and manga artist.",
                birth: "1941"
            }, 
            imagePath: "https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png"
        },
        { 
            id: 3, 
            title: "Ponyo",
            description: "A five-year-old boy develops a relationship with Ponyo, a young goldfish princess who longs to become a human after falling in love with him.",
            genre: {
                name: "Adventure",
                description: "Adventure film is a genre that revolves around the conquests and explorations of a protagonist."
            },
            director: {
                name: "Hayao Miyazaki",
                bio: "Hayao Miyazaki is a Japanese animator, filmmaker, and manga artist.",
                birth: "1941"
            }, 
            imagePath: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Ponyo_%282008%29.png/220px-Ponyo_%282008%29.png" 
        },
        {   
            id: 4, 
            title: "My Neighbor Totoro",
            description: "When two girls move to the country to be near their ailing mother, they have adventures with the wondrous forest spirits who live nearby.",
            genre: {
                name: "Fantasy",
                description: "Fantasy film is a genre that incorporates imaginative and fantastic themes."
            },
            director: {
                name: "Hayao Miyazaki",
                bio: "Hayao Miyazaki is a Japanese animator, filmmaker, and manga artist.",
                birth: "1941"
            }, 
            imagePath: "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/My_Neighbor_Totoro_-_Tonari_no_Totoro_%28Movie_Poster%29.jpg/220px-My_Neighbor_Totoro_-_Tonari_no_Totoro_%28Movie_Poster%29.jpg" 
        },
        { 
            id: 5, 
            title: "Suzume",
            description: "A modern action adventure road story where a 17-year-old girl named Suzume helps a mysterious young man close doors from the other side that are releasing disasters all over in Japan.",
            genre: {
                name: "Adventure",
                description: "Adventure film is a genre that revolves around the conquests and explorations of a protagonist."
            },
            director: {
                name: "Makoto Niitsu",
                bio: "Makoto Niitsu, known as Makoto Shinkai, is a Japanese animator, filmmaker, author, and manga artist.",
                birth: "1973"
            }, 
            imagePath: "https://upload.wikimedia.org/wikipedia/en/7/7f/Suzume_no_Tojimari_poster.jpg" 
        }
    ]);


    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
          <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
      } //sets selectedMovie back to its initial state value when back button is clicked

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }
    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};