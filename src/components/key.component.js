import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import ALLService from "../services/user.service";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class Key extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeSecret = this.onChangeSecret.bind(this);

        this.state = {
            secret: "",
            loading: false,
            message: "",
            key: null,
            allKey: []
        };
    }

    onChangeSecret(e) {
        this.setState({
            secret: e.target.value
        });
    }


    componentDidMount() {
        ALLService.getKey().then(
            (key) => {
                this.setState({ allKey: key.data })
                //console.log(this.state.allKey.data)
            },
            error => {
                this.setState({ allKey: [] })
            }
        )
    }
    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();
       // console.log(this.state.secret)
        if (true) {
            ALLService.insertkey(this.state.secret).then(
                (key) => {
                    //console.log(key.data)  // return key.json();
                    // this.setState({ key: ru })
                    this.setState({
                        loading: false,
                        message: "Done"
                    });
                    //this.props.history.push("/profile");
                    //window.location.reload();
                },
                error => {
                    const resMessage = error.message

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            )
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        return (

            <div className="col-md-12" style={{ marginTop: "24px" }}>

                <h2>Keys</h2>
                <hr />
                <div class=" ">
                    <h6>Secret Key</h6>
                    <p>Please dont share with any ones.</p>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>KeyID</th>
                                <th>Public Key</th>
                                {/* <th>Private Key</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.allKey && this.state.allKey.length > 0 && this.state.allKey.map((item, index) => {
                                return (
                                    <>
                                        <tr>
                                            <td className="word_">{index + 1}</td>
                                            <td className="word_">{"Public Key ......"}</td>
                                            {/* <td>{item.private}</td> */}

                                        </tr>
                                    </>
                                )

                            })}
                            {this.state.allKey && this.state.allKey.length == 0 &&
                                //  this.state.allKey.map((item, index) => {
                                <tr>
                                    <td colSpan="2" align="center">No Key</td>

                                </tr>
                                // })
                            }
                        </tbody>
                    </table>
                </div>


                {this.state.allKey && this.state.allKey && this.state.allKey.length > 0  && <div className={"card card-container_"}>

                    <Form style={{ align: "center" }}
                        onSubmit={this.handleSubmit}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="username">Secret key</label>
                            <Input
                                style={{ width: "200px" }}
                                type="text"
                                className="form-control"
                                name="username"
                                value={this.state.secret}
                                onChange={this.onChangeSecret}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group " >
                            <button style={{ width: "100px" }}
                                className="btn btn-primary btn-block"
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Submit</span>
                            </button>
                        </div>

                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}

                    </Form>

                </div>
                }
                {/* {this.state.key &&
                    <div className={"card "}>
                        <><p>
                            <strong>Public:</strong>{" "}
                            {this.state.key.public}
                        </p>
                            <p>
                                <strong>Private:</strong>{" "}
                                {this.state.key.private}
                            </p>
                        </>
                    </div>} */}
            </div >
        );
    }
}
