import React, {Component} from "react";
import pic1 from './../pic/1.PNG'
import pic2 from './../pic/2.PNG'
import pic3 from './../pic/3.PNG'

class BookCarousel extends Component{
    render()
    {
        return(
            //<div className="container">
                <div className="row clearfix">
                    <div className="col-md-12 column">
                        <div className="carousel slide" id="carousel-182787">
                            <ol className="carousel-indicators">
                                <li className="active" data-slide-to="0" data-target="#carousel-182787"></li>
                                <li data-slide-to="1" data-target="#carousel-182787"></li>
                                <li data-slide-to="2" data-target="#carousel-182787"></li>
                            </ol>
                            <div className="carousel-inner">
                                <div className="item active">
                                    <img alt="" src={pic1}/>
                                    <div className="carousel-caption">
                                        <h4>
                                            ONE
                                        </h4>
                                        <p>
                                            Sometimes it's hard to accept the truth because the lies sound so much better.
                                        </p>
                                    </div>
                                </div>
                                <div className="item">
                                    <img alt="" src={pic2}/>
                                    <div className="carousel-caption">
                                        <h4>
                                            TWO
                                        </h4>
                                        <p>
                                            Our life is not a mere fact; it is a movement, a tendency, a steady, ceaseless progress towards an unseen goal.
                                        </p>
                                    </div>
                                </div>
                                <div className="item">
                                    <img alt="" src={pic3}/>
                                    <div className="carousel-caption">
                                        <h4>
                                            THREE
                                        </h4>
                                        <p>
                                            That maybe happiness is something that we can only pursue. And maybe we can actually never have it no matter what.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <a className="left carousel-control" href="#carousel-182787" data-slide="prev">
                                <span className="glyphicon glyphicon-chevron-left"></span>
                            </a>
                            <a className="right carousel-control" href="#carousel-182787" data-slide="next">
                                <span className="glyphicon glyphicon-chevron-right"></span>
                            </a>
                        </div>
                    </div>
                </div>
           // </div>
        );
    }
}

export default BookCarousel;