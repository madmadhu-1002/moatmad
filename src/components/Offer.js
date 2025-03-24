import { Col, Container, Row } from 'react-bootstrap';

const Offer = ({offers}) => {
  return (
    <div>
        <Container fluid className='mb-5' style={{ padding: "0px 32px" }}>
          <Row style={{ padding: "0px 18px 200px 20px" }} className='g-3'>
            <h3 className='text-center mt-5 mb-5' style={{ fontWeight: "700", marginBottom: "0px", padding: "0px" }}>Offers</h3>

            {offers.map((offer, index) => (
              <Col lg={6} key={offer.id} className='' style={{ boxShadow: "0 1px 3px #0000001f, 0 1px 2px #0000003d", height: "330px", paddingLeft: index % 2 === 0 ? '0px' : '15px', paddingRight: index % 2 !== 0 ? '0px' : '15px' }}>
                <img src={offer.image} style={{ objectFit: "fill", height:"100%" }}  width={'100%'} alt={offer.image_alt || offer.title_en} className='offer-image'/>
                <div  dangerouslySetInnerHTML={{ __html: offer.summary_en }} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
  )
}

export default Offer