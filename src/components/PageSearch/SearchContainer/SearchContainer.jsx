import React from "react";
import PropTypes from "prop-types";
import {Button} from "semantic-ui-react";

import SearchResult from "../SearchResult/SearchResult";
import {alphabet} from "../../../utils/helper";

class SearchContainer extends React.PureComponent {

    static propTypes = {
        clickedLetter: PropTypes.string.isRequired,
        cbClickLetter: PropTypes.func.isRequired,
    };

    createAlphabetColumn = (arrayOfLetter) => {
        return arrayOfLetter.map((letter, index) => {
                return (
                    <div key={index}>
                        <Button
                            size={'mini'}
                            className={letter.toLowerCase() === this.props.clickedLetter ? 'active' : ''}
                            onClick={this.clickLetter}>
                            {letter}
                        </Button>

                    </div>
                )
            }
        )
    };

    clickLetter = (e) => {
        let letter = e.target.textContent.toLowerCase();
        this.props.cbClickLetter(letter);
    };

    render() {
        const alphabetSize = Math.ceil(alphabet.length / 2);
        const column1 = alphabet.slice(0, alphabetSize);
        const column2 = alphabet.slice(alphabetSize);

        return (
            <div className={'searchContainer'}>
                <div className={'search-buttons'}>
                    <div className={'alphabet-column'}>{this.createAlphabetColumn(column1)}</div>
                    <div className={'alphabet-column'}>{this.createAlphabetColumn(column2)}</div>
                </div>
                <SearchResult/>
            </div>
        )
    }
}

export default SearchContainer;