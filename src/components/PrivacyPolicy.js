
import { Container, Row, Col } from 'react-bootstrap';

const PrivacyPolicy = ({data}) => {
  return (
    <Container fluid>
        <Row>

          <div className='mt-5 mb-5 products-heading'>
            <h1>{data && data.category_title_en}</h1>
          </div>

          <Col lg={12} style={{ padding: '0px 40px' }}>
            {data && data.description_en && <div className="m-5" dangerouslySetInnerHTML={{ __html: data.description_en }} />}


          </Col>
        </Row>
    </Container>
  )
}

export default PrivacyPolicy