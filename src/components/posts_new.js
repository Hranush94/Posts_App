import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from "../actions/index";

class PostsNew extends Component {
  renderField(field) {
    /* {field.label} kvercni amen fieldi mej grvac label
    * {field.meta.error} shows errors to users when form is submitted*/
   // const {meta: {touched,error}}=field; karanq senc haytararenq u miangamic ogtagorcenq
    //  nerqevi toghum {touched && error ?.....ev ayln}
    const className=`form-group ${field.meta.touched && field.meta.error ? 'has-danger':''}`;
    
    return (
      <div className={className}>
        <label>
          {field.label}
        </label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
        {field.meta.touched? field.meta.error:''}
        </div>
      </div>
    )
  }
  onSubmit(values){console.log(values);
    //this===component
    //this.props.history.push('/');
    // history.push -sra mijocov avtomat ugharkuma glxavor ej
    // ,posty sarqeluc heto,dra hamar karanq createPostin actionsi mej  tanq 2rd argument callback function
    // vor posty sarqi,heto ugharki glxavor ej
    this.props.createPost(values,()=>{
      this.props.history.push('/');
    });
  }
  render() {
    const{handleSubmit }=this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title For Post"
          name="title"
          component={this.renderField}
        
        /> <Field
        label="Categories"
        name="categories"
        component={this.renderField}
      
      />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger" > Cancel</Link>
      </form>
    )
  }
}

function validate(values) {
//console.log(values)->{title:'asdf'}
  const errors = {};
  // validate the inputs from 'values'
  if (!values.title || values.title.length < 3) {
    errors.title = "Enter a title that is at least 3 characters!";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories";
  }
  if (!values.content) {
    errors.content = "Enter some content please";
  }
  
  //if errors is empty ,the form is fine to submit
  //if errors has any properties ,redux form assumes form is invalid
  return errors;
}


export default reduxForm({
  validate: validate,// if key and value are equal we can write only validate in es6
  form: 'PostsNewForm'// form i anuny petqa unique lini
})(connect(null,{createPost})(PostsNew));