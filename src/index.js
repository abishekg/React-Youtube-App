import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

// import './../style/style.css'
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const apiKey = "AIzaSyDVsuJM6ZgpS7yCGwQeiThBaAeTGnVH40o";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('');
    }

    videoSearch(term) {
        YTSearch({ key: apiKey, term: term }, (videos) => {
            this.setState({
                videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => {
            this.videoSearch(term)
        }, 300);

        return (<div>
            <SearchBar
                onSearchTermChange={videoSearch}
            />
            <VideoDetail
                video={this.state.selectedVideo}
            />
            <VideoList
                onVideoSelect={(selectedVideo) => this.setState({ selectedVideo })}
                videos={this.state.videos}
            />
        </div>);
    };
}

ReactDOM.render(<App />, document.querySelector('.container'));


//AIzaSyDVsuJM6ZgpS7yCGwQeiThBaAeTGnVH40o