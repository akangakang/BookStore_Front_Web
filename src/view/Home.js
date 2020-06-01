import React, {Component} from "react";
import BookCarousel from "../components/BookCarousel";
import Nar1 from "../components/NarBar";
import Bread from "../components/Bread";
import 'antd/dist/antd.css';
import LiuTong from "../pic/LiuTong.PNG";
import SanMao from "../pic/SanMao.PNG";
import QuanQiu from "../pic/quanqiutongshi.PNG";
import YiZhan from "../pic/yizhanshi.PNG";
import AiZheng from "../pic/AiZheng.PNG";
import XiangGnag from "../pic/Xianggang.PNG";
import './../css/login.css';
import {withRouter} from "react-router-dom";


const BOOK = [
    {
        name: '《我在未来等你》',
        author: '刘同',
        pic: LiuTong,
        intro: '一个关于郝回归的故事，一个能与你的生活相似非似的故事在微博和抖音都火的一本书，小编用了整整两天看完的，不忍心剧透，真心好看，书中还有一封手写信，你会被惊艳的。'
    },
    {
        name: '《撒哈拉的故事》',
        author: '三毛',
        pic: SanMao,
        intro: '这是关于三毛和荷西的故事，这本书都是写的他们在沙漠中生活的故事，你会知道沙漠里的人怎么生活，有什么习惯以及所有温情和残忍。'
    },
    {
        name: '《全球通史》',
        author: '斯塔夫里阿诺斯',
        pic: QuanQiu,
        intro: '首开由历史学家运用全球观点囊括全球文明而编写的世界历史的先河，主要讲述了世界历史的进化，世界文明的发展及其对现代社会的影响。作者着眼于全球，侧重于那些有影响的、促进历史发展的历史事件'
    },
    {
        name: '《一战史》',
        author: '约翰·基根',
        pic: YiZhan,
        intro: '约翰•基根以中文世界罕见的深度详述了一战的进程，对交战各方的总体战略、重大战役的战术方针、战争领袖的才干与局限、军事技术的发展、偶然因素的作用等等，均做出令人叹服的介绍与分析。'
    },
    {
        name: '《癌症的消亡》',
        author: '文森特·T.德维塔',
        pic: AiZheng,
        intro: '癌症总会以这样或那样的方式影响人们的生活。无论你从事什么职业，也无论你拥有多少财富，都不可回避癌症的风险及其所带来的压力。谈癌色变几乎是每个人的第一反应。但是，大多数人对于癌症知之甚少。'
    },
    {
        name: '《香港方物志》',
        author: '叶灵凤',
        pic: XiangGnag,
        intro: '香港是个可爱的地方，既有都市的繁华也有乡郊的朴实宁静。不过，除了繁华的一面外，很少有人会留意这座城市素淡的一面，去考察了解其中的风土物种。许多人或许会奇怪，这个繁华市声所在之地居然也会有这么些鸟兽虫鱼么？'
    }
];
const STORE = [
    {
        anchorname: '1',
        class: '青春美学',
        classintro: '青春文学，又称青春美文，刚开始它的概念离文学的距离还是远的，它的作者基本上是年轻人，他们写的作品大部分的意思没有很深的内涵，都是回忆青春或懵懂之年的爱情故事。',
        book1: BOOK[0],
        book2: BOOK[1]
    },
    {
        anchorname: '2',
        class: '历史文学',
        classintro: '一是真实之美，这是通过史学家的文字表述所反映出来的历史撰述的本质的美。史家历来重信史，历史撰述只有在反映了真实的（至少在史学家看来是尽力做到了真实的）历史面貌时，它才是美的。二是质朴之美，指历史撰述的文字表述在反映真实史实的基础上，写出事物的本色，说人如其人，论事如其事。三是简洁之美，“文笔简洁在任何时候都是优点，尤其是在内容丰富的场合；这个问题不仅是修辞的而且是本质的问题。”',
        book1: BOOK[2],
        book2: BOOK[3]
    },
    {
        anchorname: '3',
        class: '科普读物',
        classintro: '科普就是科学技术普及的简称。人类的科学和技术活动，包括两个方面：一是科学技术的研究与开发；二是科学技术的传播与人才培养。因此科普是科技工作的重要组成部分。科普就是把人类研究开发的科学知识、科学方法，以及融化于其中的科学思想和科学精神，通过多种方法，多种途径传播到社会的方方面面，使之为公众所理解。',
        book1: BOOK[4],
        book2: BOOK[5]
    }
];


class BookClassIntroBlock extends Component {
    render() {
        return (
            <div>
                <br/> <br/> <br/> <br/>
                <h1>
                    {this.props.bookClassName}
                </h1>
                <br/>
                <p>
                    <div className="siyuanheiti">{this.props.bookClassIntroduction}</div>
                </p>

            </div>

        );
    }

}

class BookBlock extends Component {
    render() {
        return (
            <div>
                <img style={{maxWidth: 350, height: 'auto'}} src={this.props.pic} className="img-rounded"/>
                <br/><br/>

                <div className="myh31">{this.props.bookName}{this.props.author}</div>


                <br/>
                <p className="siyuanheiti">
                    <span> {this.props.introduction}</span>
                </p>
                <p>
                    <a className="btn  btn-primary" href="#">View details »</a>
                </p>
            </div>


        );
    }
}

class BookLeft extends Component {
    render() {
        return (

            <div className="row clearfix">

                <div id={this.props.anchorname}></div>
                <br/><br/>
                <div className="col-md-4 column">
                    <BookClassIntroBlock
                        bookClassName={this.props.class}
                        bookClassIntroduction={this.props.classintro}
                    />
                </div>

                <div className="col-md-4 column">
                    <BookBlock
                        bookName={this.props.book1.name}
                        author={this.props.book1.author}
                        introduction={this.props.book1.intro}
                        pic={this.props.book1.pic}
                    />
                </div>

                <div className="col-md-4 column">
                    <BookBlock
                        bookName={this.props.book2.name}
                        author={this.props.book2.author}
                        introduction={this.props.book2.intro}
                        pic={this.props.book2.pic}
                    />
                </div>
                <br/><br/>
            </div>
        );

    }

}

class BookRight extends Component {
    render() {
        return (
            <div className="row clearfix ">
                <div id={this.props.anchorname}></div>

                <br/><br/>
                <div className="col-md-4 column">
                    <BookBlock
                        bookName={this.props.book1.name}
                        author={this.props.book1.author}
                        introduction={this.props.book1.intro}
                        pic={this.props.book1.pic}
                    />
                </div>

                <div className="col-md-4 column">
                    <BookBlock
                        bookName={this.props.book2.name}
                        author={this.props.book2.author}
                        introduction={this.props.book2.intro}
                        pic={this.props.book2.pic}
                    />
                </div>

                <div className="col-md-4 column">
                    <BookClassIntroBlock
                        bookClassName={this.props.class}
                        bookClassIntroduction={this.props.classintro}
                    />
                </div>
                <br/><br/>
            </div>
        );

    }

}

class Home extends Component {


    render() {
        //console.log(localStorage);
        var left = false;
        const bigBlock = [];

        STORE.forEach((store) => {

                if (left) {
                    bigBlock.push(
                        <BookLeft
                            class={store.class}
                            classintro={store.classintro}
                            book1={store.book1}
                            book2={store.book2}
                            key={store.class}
                            anchorname={store.anchorname}/>
                    );
                    left = false;

                } else {
                    bigBlock.push(
                        <BookRight
                            class={store.class}
                            classintro={store.classintro}
                            book1={store.book1}
                            book2={store.book2}
                            anchorname={store.anchorname}/>
                    );
                    left = true;

                }

            }
        );
        return (
            <div className="background">
                <div className="container ">
                    <div className="col-md-12 column">


                        <Nar1/>
                        <br/><br/><br/>
                        <Bread/>
                        <br/>
                        <BookCarousel/>

                        <br/>
                        <div> {bigBlock}</div>

                        <br/> <br/>
                        <div style={{ textAlign: 'center' }}>AKang Design ©2020 Created by AKang</div>
                        <br/> <br/>
                    </div>

                </div>
            </div>
        );
    }

}

export default  withRouter(Home);