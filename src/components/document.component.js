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

export default class Wallet extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeSecret = this.onChangeSecret.bind(this);

        this.state = {
            selectedFile: "",
            loading: false,
            message: "",
            key: null
        };
    }

    onChangeSecret(e) {
        this.setState({
            selectedFile: e.target.files[0],
        });
    }




    componentDidMount() {
        // ALLService.getWallet().then(
        //     (key) => {
        //         this.setState({ allKey: key.data })
        //         //console.log(this.state.allKey.data)
        //     },
        //     error => {
        //         this.setState({ allKey: [] })
        //     }
        // )
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        let valid=this.form.validateAll();
        //alert(valid)
        if (!valid) {
            const userkey =localStorage.getItem('user') ?JSON.parse(localStorage.getItem('user')):{};

            const data = new FormData() 
            data.append('file', this.state.selectedFile)
            data.append('publicKey', userkey.key)
            ALLService.insertDocs(data).then(
                (key) => {
                    //console.log(key.data)  // return key.json();
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
                <h2>Wallet</h2>
                <hr />
               <div className={""}>
                   
                     <Form
                        onSubmit={this.handleSubmit}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="username">File</label>
                            <input type="file" name="file" onChange={this.onChangeSecret}  validations={[required]}/>

                            {/* <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={this.state.secret}
                                onChange={this.onChangeSecret}
                                validations={[required]}
                            /> */}
                        </div>

                        <div className="form-group">
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
             
               </div>
        );
    }
}
