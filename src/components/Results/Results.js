import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardHeader, CardFooter
} from 'reactstrap';
import './Results.css'
class TrackResult extends Component {
    constructor(props) {
        super(props);
        this.scaleImage = this.scaleImage.bind(this);

    }
    scaleImage(imageurl) {
        return imageurl.replace("source/30x30bb.jpg", "source/250x250bb.jpg")
    }
    render() {

        const image = this.scaleImage(this.props.track.artworkUrl30)
        if (this.props.track.kind === 'song') {
            return (
                <Card className="expand mycard">
                    <CardHeader tag="h3">Song</CardHeader>
                    <CardImg top width="100%" src={image} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{this.props.track.trackName}</CardTitle>
                        <CardSubtitle>{this.props.track.artistName}</CardSubtitle>
                        <CardText>The song {this.props.track.trackName}, was featured in the {this.props.track.collectionName} album.</CardText>
                    </CardBody>
                    <CardFooter tag="h3">
                        <Button href={this.props.track.trackViewUrl}>Preview</Button>
                    </CardFooter>
                </Card>
            );
        }
        if (this.props.track.kind === 'feature-movie') {
            return (
                <Card className="expand mycard">
                    <CardHeader tag="h3">Movie</CardHeader>
                    <CardImg top width="100%" src={image} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{this.props.track.trackName}</CardTitle>
                        <CardSubtitle>{this.props.track.artistName}</CardSubtitle>
                        <CardText>{this.props.track.shortDescription}</CardText>
                    </CardBody>
                    <CardFooter tag="h3">
                        <Button href={this.props.track.trackViewUrl}>Preview</Button>
                    </CardFooter>
                </Card>
            );
        }
        return null
    }
}

class ArtistResult extends Component {
    render() {
        return (
            <Card className="expand mycard">
                <CardHeader tag="h3">Artist</CardHeader>
                <CardBody>
                    <CardTitle>{this.props.artist.artistName}</CardTitle>
                    <CardSubtitle>{this.props.artist.primaryGenreName}</CardSubtitle>
                    <CardText>{this.props.artist.artistName} is a {this.props.artist.primaryGenreName} artist.</CardText>
                    <Button href={this.props.artist.artistLinkUrl}>Browse</Button>
                </CardBody>
                <CardFooter tag="h3">
                    <Button href={this.props.artist.artistLinkUrl}>Browse</Button>
                </CardFooter>
            </Card>
        );
    }
}
export { ArtistResult, TrackResult }
