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
            key: null
        };
    }

    onChangeSecret(e) {
        this.setState({
            secret: e.target.value
        });
    }



    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (true) {
            ALLService.insertkey(this.state.secret).then(
                (key) => {
                    //console.log(key.data)  // return key.json();
                    this.setState({ key: key.data })
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
            <div className="col-md-12">
              {!this.state.key &&  <div className={"card card-container"}>
                   
                     <Form
                        onSubmit={this.handleSubmit}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="username">Secret key</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={this.state.secret}
                                onChange={this.onChangeSecret}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <button
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

                    </Form>}

                </div>
               } {this.state.key &&<div className={"card "}>
                   
                        <><p>
                            <strong>Public:</strong>{" "}
                            {this.state.key.public}
                        </p>
                            <p>
                                <strong>Private:</strong>{" "}
                                {this.state.key.private}
                            </p>
                        </>

                </div> }
            </div>
        );
    }
}
