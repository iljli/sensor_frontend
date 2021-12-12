import logo1 from "../pictures/logo1.png"

const Footer = () => {
  return (

    <footer className="page-footer footer_1">
      <div className="container">
        <div className="row">
          <img className="logo1" src={logo1} />

          <div className="col l0 s5">
            <h5 className="white-text">© Moisturize me</h5>

            <p className="grey-text text-lighten-4">
              2021
            </p>
          </div>

        </div>
      </div>

    </footer>
  )

}

export default Footer;