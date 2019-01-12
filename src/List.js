import React from 'react';
import MovieTable from './MovieTable';
import './List.css';

class List extends React.Component {
    constructor() {
        super();
        // Create test variable.
        this.testVarible = "this is a test";
        this.myapikey    = '0e67476f6b730503eaa58d8cefee6b12';

        // Adding state. 
        this.state = {
            currentDate:null,
            threeMonthsAgo:null,
            loading: true,
            totalPages:10,
            currentPage:1,
            movies: [],
            error: null,
            genresId: 28,
            genresIdArray: [{
                  "id": 28,
                  "name": "Action"
                },
                {
                  "id": 12,
                  "name": "Adventure"
                },
                {
                  "id": 16,
                  "name": "Animation"
                },
                {
                  "id": 35,
                  "name": "Comedy"
                },
                {
                  "id": 80,
                  "name": "Crime",
                  "selected": null
                },
                {
                  "id": 99,
                  "name": "Documentary"
                },
                {
                  "id": 18,
                  "name": "Drama"
                },
                {
                  "id": 10751,
                  "name": "Family"
                },
                {
                  "id": 14,
                  "name": "Fantasy"
                },
                {
                  "id": 36,
                  "name": "History"
                },
                {
                  "id": 27,
                  "name": "Horror"
                },
                {
                  "id": 10402,
                  "name": "Music"
                },
                {
                  "id": 9648,
                  "name": "Mystery"
                },
                {
                  "id": 10749,
                  "name": "Romance"
                },
                {
                  "id": 878,
                  "name": "Science Fiction"
                },
                {
                  "id": 10770,
                  "name": "TV Movie"
                },
                {
                  "id": 53,
                  "name": "Thriller"
                },
                {
                  "id": 10752,
                  "name": "War"
                },
                {
                  "id": 37,
                  "name": "Western"
                }
              ]
          
        }
    }

    showAlert(e, index) {
        
    }

    getMonth(date) {
        var month = date.getMonth() + 1;
        return month < 10 ? '0' + month : '' + month; 
    }  

    getDay(d)
    { 
        return (d.getDate() < 10 ? '0' : '') + d.getDate();
    }

    getFormattedDate(isPriorDate) {
        var d = new Date();
        var year  = d.getFullYear();
        var month = this.getMonth(d);
        var day   = this.getDay(d);

        if(isPriorDate) {
            var d2 = new Date();
            d2.setMonth(d2.getMonth() - 3);
            month  = d2.getMonth();
            year   = d2.getFullYear();
            day = d2.getDay();  
        }
        console.log(year + "-" + month + "-" + day);
        return year + "-" + month + "-" + day;
    }

    getData() {
        // var d = new Date();
        var currentDate = this.getFormattedDate(false);     
        var priorDate    = this.getFormattedDate(true); 
        var genresId = this.state.genresId;
        this.setState({ loading: true });
        const _page = this.state.currentPage;
        console.log('Request Page '+ _page);
        const url = 'http://api.themoviedb.org/3/discover/movie?api_key='
                     + this.myapikey
                     + '&primary_release_date.gte=' + priorDate
                     + '&primary_release_date.lte=' + currentDate
                     + '&page=' + _page + '&with_genres='+genresId;
        console.log(url)
        // This code gets data from the remote server.
        fetch(url).then(response => {
            return response.json().then(json => {
                return response.ok ? json : Promise.reject(json);
            });
        })

        // This data parses the data and handles it in the application.
        .then((data) => {
            console.log('Success', data);
            for(let i=0;i<data.results.length;i++)
            {
                if(data.results[i].poster_path==null)
                {
                  data.results[i].poster_path = "images/no_poster.jpg";
                }
                else{
                    data.results[i].poster_path = "https://image.tmdb.org/t/p/w500"+data.results[i].poster_path;
                }
                if(data.results[i].backdrop_path==null)
                {
                  data.results[i].backdrop_path = "images/no_poster_moblie.jpg";
                }
                else{
                    data.results[i].backdrop_path = "https://image.tmdb.org/t/p/w500"+data.results[i].backdrop_path;
                }
            }
            this.setState({ movies: data.results, loading: false ,totalPages:data.total_pages });

        })
        // This area is called when something goes wrong.
        .catch((error) => {
            this.setState({ error: error.errorMessage, loading: false });
            console.log('Error', error);
        });
    }

    // This is a life cycle hook. It is provided with the React framework.
    // componentDidMount() gets called after the component object is built.
    componentDidMount() {
       this.getData();
    }

    nextPage(e) {
        if(this.state.currentPage<this.state.totalPages) {
            this.setState({currentPage:this.state.currentPage+1},()=>{
                this.getData();
            })
         
        }  
    }

    prevPage(e){
        if(this.state.currentPage<=this.state.totalPages&&this.state.currentPage>1) {
            this.setState({currentPage:this.state.currentPage-1},()=>{
                this.getData();
            })
           
           
        }  
    }

    changeMovieType(e){
    
            this.setState({genresId: e.target.value, currentPage:1},()=>{
                this.getData();
            });
           
    }

    render() {
        const { movies } = this.state;
        const { genresIdArray } = this.state
        if (this.state.loading) {
            return <div>Loading...</div>
        }
        return (
            // Loop through currency.
            <div>
                <div className="select-container">
                <span>Movie Type </span>
                <select className="selectbar" value={this.state.genresId} onChange={(e)=> this.changeMovieType(e)}>
                {
                this.state.genresIdArray.map((genresId) => (
                    <option key={genresId.id} value={genresId.id}  >{genresId.name}</option>
                ))
                }

                </select>
                </div>
                <div className="btn-group">
                <button className="page-btn" onClick={(e) => this.prevPage(e)}>&larr;</button>    
                {this.state.currentPage} of {this.state.totalPages} 
                <button className="page-btn" onClick={(e) => this.nextPage(e)}>&rarr;</button>   
                </div>
               
                <MovieTable movies={movies} genresIdArray={genresIdArray}></MovieTable>
                  
            </div>
        )
    }
}
export default List;
