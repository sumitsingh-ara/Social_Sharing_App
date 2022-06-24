export const ContactAdmin = () => {
  return (
    <section className="mx-auto w-75" style={{marginTop:"15vh"}}>
      <h2 className="h1-responsive font-weight-bold text-center my-4">
        Contact us
      </h2>
      <p className="text-center w-responsive mx-auto mb-5">
        Do you have any questions? Please do not hesitate to contact us
        directly. Our team will come back to you within a matter of hours to
        help you.
      </p>
      <div className="container">
        <a href="geo:124.028582,-29.201930" target="blank" className="m-5">
        <i className="fas fa-map-marker-alt fa-2x"></i>
      </a>

      <a href="tel:+918507547919" className="text-decoration-none m-5">
        <i className="fas fa-phone mt-4 fa-2x"></i>
      </a>

      <a href="mailto:singhsumitkumar503@gmail.com"  className="m-5">
        <i className="fas fa-envelope mt-4 fa-2x"></i>
      </a>
      </div>
      <h1 className="h4" style={{position:"fixed",bottom:0,left:0,right:0}}>Made with ❤️ by <a href="https://www.linkedin.com/in/sumit-singh-ara/" target="_blank" rel="noopener noreferrer" >Sumit</a> </h1>
    </section>
  );
};
