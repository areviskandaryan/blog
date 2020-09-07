import React from 'react';


let generateNewId = () => {
    let id = 0;

    return () => {
        id += 1;
        return id
    }
}
let uniqueId = generateNewId();


class Createpost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            title: "",
            redirectToReferrer: false,
            postsArray: [],
        }
    }

    handleInput = ({target: {value}}) => {
        this.setState({title: value})

    }

    handleTextarea = ({target: {value}}) => {
        this.setState({content: value});

    }


    handleSubmit = (e) => {
        e.preventDefault();

        this.setState((prevState) => {

            let somePost = {
                title: prevState.title,
                content: prevState.content,
                date: new Date(),
                postId: uniqueId(),

            }

            return ({
                postsArray: [...prevState.postsArray, somePost],
                redirectToReferrer: true,
            })
        })

        this.setState((prevState) => {
            console.log(prevState.postsArray);
            this.props.addPost(prevState.postsArray);
            return ({title: "", content: "", redirectToReferrer: true})
        })


    }


    render() {

        return (
            <div>
                <h1>Tell us your story</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Title
                            <input type="text" value={this.state.title} onChange={this.handleInput}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Content
                            <textarea type="text" rows={15} cols={30} value={this.state.content}
                                      onChange={this.handleTextarea}></textarea>
                        </label>
                    </div>
                    <button type="submit">Submit</button>

                </form>

            </div>


        )
    }

}


export default class App extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            nameValue: "",
            surNameValue: "",
            errorName: "",
            errorSurName: "",
            isLogin: false,
            posts: [],
            mainRoutes: [
                {
                    name: "Blog",
                    url: "/",
                },
                {
                    name: "Create Post",
                    url: "/post",
                },
                {
                    name: "Log In",
                    url: "/login",
                }
            ]
        }
    }


    addPost = (postsArray) => {
        let {posts} = this.state;
        let newPost = [...postsArray, ...posts];
        this.setState({posts: newPost});

    }


    render() {


        return (<div>
            <Createpost addPost={this.addPost}/>
        </div>)
    }

}