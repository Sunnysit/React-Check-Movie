
import React, { Component } from 'react';
import './MovieTable.css';

class MovieTable extends Component{
    constructor(props) {
        super(props);
        this.state={
            openWindowClass:'movie-detail-container hide-window',
            openWindow:false,
            genre_names:"",
            movieInfo:[
            {   vote_count: 0,
                id: 0,
                video: false,
                vote_average: 0,
                title: "",
                popularity: 0,
                poster_path: "",
                original_language: "",
                original_title: "",
                genre_ids: [],
                backdrop_path: "",
                adult: false,
                overview: "",
                release_date: "",
               
            }
            ]
        }
    }


    showDetailInfo(e,movieObject){
        
        let genreNames = "";
        movieObject.genre_ids.forEach(id => {
            this.props.genresIdArray.forEach(gObject => {
               
                if(id === gObject.id){
                    genreNames += gObject.name + " ";
                    return false;
                }
            });
        });
        this.setState({movieInfo:movieObject,
                       genre_names:genreNames,
                       openWindow:true,
                       openWindowClass:'movie-detail-container'
        },()=>{
            console.log(this.state.movieInfo);
        });
   
    }

    closeDetailWindow(e){
      
        if(this.state.openWindow){
            this.setState({openWindow:false,
                openWindowClass:'movie-detail-container  hide-window'
            });
        }

       
    }

    render(){
        return (
            <div className="movie-list-container">
                {this.props.movies.map((movie) => (
                    <div className="movie-item" key={movie.id}>
                        <div className="movie-img-container" onClick={(e) => this.showDetailInfo(e,movie)}>
                        <img className="movie-poster" src={ movie.poster_path} alt={movie.title + '_poster'}/>
                        <img className="movie-poster-mobile" src={ movie.backdrop_path} alt={movie.title + '_poster'}/>
                        </div>
                        <div className="movie-info">
                                 
                                    <h4 className="movie-title">{movie.title}</h4>
                                    <p className="date">{movie.release_date}</p>
                                 
                        </div>
                    </div>
                ))}

                <div className={this.state.openWindowClass} >
                
                    <div className="movie-detail-basic-container">
                    <img className="movie-detail-poster" src={this.state.movieInfo.poster_path} alt={this.state.movieInfo.title + '_poster'}/>
                    <div className="movie-detail-textarea">
                    <h2 className="movie-detail-title">{this.state.movieInfo.title}</h2>
                    <h5>Movie Type: </h5>
                    <p>{this.state.genre_names}</p>
                    <h5>Score: </h5>
                    <p>{this.state.movieInfo.vote_average}/10</p>
                    <h5>Release Date: </h5>
                    <p>{this.state.movieInfo.release_date}</p>
                    </div>
                    </div>
                    <p className="movie-overview">{this.state.movieInfo.overview}</p>
                    <a className="view-more-btn" target="_blank" href={'https://www.themoviedb.org/movie/'+this.state.movieInfo.id}>View More</a>
                    <button className="close-btn" onClick={(e) => this.closeDetailWindow(e)}><img src="./images/cancel.svg" alt="cancel"/></button>
                </div>

            </div>)
    }

}

export default MovieTable;
