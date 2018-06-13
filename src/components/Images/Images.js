import React, { Component } from 'react';
import {
    Card, CardImg, CardImgOverlay, CardTitle
} from 'reactstrap';
import './Images.css'
const SPAN2PERCENT = 10
const SPAN3PERCENT = 5
class Images extends Component {
    constructor(props) {
        super(props);
        this.scaleImage = this.scaleImage.bind(this);

    }
    scaleImage(imageurl) {
        return imageurl.replace("source/30x30bb.jpg", "source/500x500bb.jpg")
    }
    render() {
        const span = ()=>{
            var random = Math.random()*100
            console.log("Working")
            if (random<(100-SPAN2PERCENT-SPAN3PERCENT)){
                return null
            }else if(random <(100-SPAN3PERCENT)){
                return "span2"
            }else{
                return "span3"
            }
        }
        const image = this.scaleImage(this.props.track.artworkUrl30)
        if (this.props.track.kind === 'song') {
            return (
                                        <div className={span()}>

                <Card className="expand mycard">
                    <CardImg top width="100%" src={image} alt="Card image cap" />
                    <CardImgOverlay>
                        <CardTitle>{this.props.track.trackName}</CardTitle>
                    </CardImgOverlay>
                </Card>
                </div>
            );
        }
        return null
    }
}

export { Images }
