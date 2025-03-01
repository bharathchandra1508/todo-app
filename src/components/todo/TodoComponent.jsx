import { useNavigate, useParams } from "react-router-dom";
import { createTodoAPI, retrieveTodoAPI, updateTodoAPI } from "./api/TodoAPIService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";

export default function TodoComponent()
{

    const {id} = useParams();
    const authContext = useAuth();
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const navigate = useNavigate();

    useEffect(()=>retrieveTodos(),[id]);

    function retrieveTodos()
    {
        if(id != -1)
        {
            retrieveTodoAPI(authContext.username,id)
                .then(response => {
                    setDescription(response.data.description);
                    setTargetDate(response.data.targetDate);
                })
                .catch(error => console.log(error));
        }
    }

    function onSubmit(values)
    {
        const todo = {
            id: id,
            username: authContext.username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        };
        console.log(todo);
        if(id == -1)
        {
            createTodoAPI(authContext.username, todo)
            .then(response => {
                navigate('/todos');
            })
            .catch(error => console.log(error));
        }
        else
        {
            updateTodoAPI(authContext.username, id, todo)
            .then(response => {
                navigate('/todos');
            })
            .catch(error => console.log(error));
        }
    }

    function validate(values)
    {
        let errors = {};
        if(values.description.length < 5){
            errors.description = 'Enter atleast 5 Characters'
        }
        if(values.targetDate == null || values.targetDate == '' || !moment(values.targetDate).isValid()){
            errors.targetDate = 'Enter a target date'
        }
        console.log(values);
        return errors;
    }

    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues={ {description, targetDate} } 
                            enableReinitialize={true} 
                            onSubmit={onSubmit} 
                            validate={validate} 
                            validateOnChange={false} 
                            validateOnBlur={false}>
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate"/>
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Update</button>
                                </div>
                            </Form>  
                        )
                    }
                </Formik>
            </div>
        </div>
    );
}