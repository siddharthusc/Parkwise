import React from "react";
import { SearchBar } from '../../utils';
import { InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

class Autocomplete extends React.Component {
    constructor(props){
        super(props);
        this.clearSearchBox = this.clearSearchBox.bind(this);
        

    }

    componentDidMount({ map, mapApi, searchText } = this.props) {
        
        const options = {
            types: ['address'],
        };
        this.autoComplete = new mapApi.places.Autocomplete(
            this.searchInput,
            options,
        );
        this.autoComplete.addListener('place_changed', this.onPlaceChanged);
        this.autoComplete.bindTo('bounds', map);

        
       
    }

    componentWillUnmount({ mapApi } = this.props) {
        mapApi.event.clearInstanceListeners(this.searchInput);
    }

    onPlaceChanged = ({ map, addplace } = this.props) => {
        const place = this.autoComplete.getPlace();

        if (!place.geometry) return;
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(10);
        }

        addplace(place);
        this.searchInput.blur();
    };

    clearSearchBox() {
        this.searchInput.value = '';

    }
    


    render() {
        return (
            <SearchBar id='search-bar'
                        type='search'
                        
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon id='searchIcon'/>
                                </InputAdornment>
                            ),
                       }}
                       inputRef={(ref) => {
                        this.searchInput = ref;
                    }}
                    onFocus={this.clearSearchBox}         
                               
                />
        );
    }
}

export default Autocomplete;