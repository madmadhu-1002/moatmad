"use client"

import { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { Chart, registerables, ArcElement } from "chart.js";
import { FaMoneyBill } from "react-icons/fa";
import styles from '@/styles/EmiCalculator.module.css'


Chart.register(...registerables);
Chart.register(ArcElement);

const currency = "AED"; // Adjusted the currency to AED


const EmiCalculator = () => {
    const [pAmount, setPAmount] = useState(300000); // Initial principal amount
  const [iRate, setIRate] = useState(4); // Initial interest rate (adding 4% later)
  const [iTime, setITime] = useState(5);
  const [downPayment, setDownPayment] = useState(Math.round(300000 * 0.2)); // Down payment as 20% of principal
  const [iAmount, setIAmount] = useState(0);
  const [tAmount, setTAmount] = useState(0);
  const [emi, setEmi] = useState(0);
  const [piepAmount, setPiepAmount] = useState(300000 - Math.round(300000 * 0.2)); // Loan amount for pie chart

  useEffect(() => {
    handleCalculate();
  }, [pAmount, iRate, iTime, downPayment]);

  const handleChangeSliderPrincipalAmount = (event) => {
    const value = parseInt(event.target.value);
    const newDownPayment = Math.round(value * 0.2);
    setPAmount(value);
    setDownPayment(newDownPayment);
    setPiepAmount(value - newDownPayment);
  };

  const handleChangeSliderIntrestRate = (event) => {
    const value = parseFloat(event.target.value);
    setIRate(value); // Setting interest rate directly
  };

  const handleChangeSliderTime = (event) => {
    const value = parseInt(event.target.value);
    setITime(value);
  };

  const handleChangeSliderDownPayment = (event) => {
    const value = parseInt(event.target.value);
    setDownPayment(value);
    setPiepAmount(pAmount - value);
  };

  const handleCalculate = () => {
    const loanAmount = pAmount - downPayment; // Adjusted principal amount
    const interestRate = (iRate) / 100; // Adding a fixed 4% to interest rate
    const totalInterest = loanAmount * interestRate * iTime; // Total interest for the loan period
    const totalAmount = loanAmount + totalInterest; // Total amount to be paid
    const emiValue = totalAmount / (iTime * 12); // EMI value
    setTAmount(Math.round(totalAmount)); // Set the total amount paid, rounded to nearest integer
    setIAmount(Math.round(totalInterest)); // Set the total interest paid
    setEmi(Math.round(emiValue)); // Set the monthly EMI, rounded to nearest integer
  };

  return (
    <Container fluid className="mb-5 mt-5" style={{ padding: '0px 0px 0px 16px ' }}>
      <Row className="justify-content-md-start" >
        <h1 style={{ padding: "0px" }} className="mb-2">EMI Calculator</h1>
        <Col lg={12} className={styles.emiCalculator}>
          <Row className="main-1st-row">
            <Col md={6} className="main-1st-col" style={{ display: 'grid' }}>
              <Row className="">
                <Col md={12} className={styles.emiStartingRate}>
                  <h5>EMI starting from</h5>
                  <h6><span>{emi}</span> per month</h6>
                </Col>
                <Col md={12} className={styles.pieChartCiecle}>
                  <div>
                    <Pie
                      data={{
                        labels: ["Principal Amount", "Interest Amount"],
                        datasets: [
                          {
                            backgroundColor: ["#74c5e8", "red"],
                            data: [piepAmount, iAmount]
                          }
                        ]
                      }}
                    />
                  </div>
                </Col>
                <Col lg={12} style={{ padding: '20px' }}>
                  <div className={styles.smallCardMainDiv}>
                    <div className={styles.smallCard}>
                      <div className="div-one"></div>&nbsp;
                      <p>Principal Loan Amount</p>
                    </div>
                    <div>
                      <p>{currency} {pAmount - downPayment}</p>
                    </div>
                  </div>

                  <div className={`${styles.smallCardMainDiv} ${styles.secondDiv}`}>
                    <div className={styles.smallCard}>
                      <div className="div-two"></div>&nbsp;
                      <p className="">Total Interest Payable</p>
                    </div>
                    <div>
                      <p>{currency} {iAmount && iAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                    </div>
                  </div>

                  <div className={styles.smallCardMainDiv}>
                    <div className={styles.smallCard}>
                      <div className=""><FaMoneyBill size={'12px'} color="green" /></div>&nbsp;
                      <p>Total Amount Payable</p>
                    </div>
                    <div>
                      <p>{currency} {tAmount && tAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={6} className={styles.priceRangeMainCol}>
              <div className={styles.mainPriceDiv}>
                <div className={styles.emiLoanamountCalculator}>
                  <p>Loan Amount</p>
                  <p>{pAmount && pAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                </div>
                <Form.Range
                  value={pAmount}
                  min={0}
                  max={300000}
                  onChange={handleChangeSliderPrincipalAmount}
                />
                <div className={styles.emiLoanamountCalculatorBelow}>
                  <p>{currency} 0</p>
                  <p>{currency} 300,000</p>
                </div>

                <div className={styles.emiLoanamountCalculator}>
                  <p>Duration of Loan</p>
                  <p>{iTime} Year{iTime > 1 && "s"}</p>
                </div>
                <Form.Range
                  value={iTime}
                  min={1}
                  max={5}
                  onChange={handleChangeSliderTime}
                />
                <div className={styles.emiLoanamountCalculatorBelow}>
                  <p>1 Year</p>
                  <p>5 Years</p>
                </div>

                <div className={styles.emiLoanamountCalculator}>
                  <p>Down Payment</p>
                  <p>{downPayment && downPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>

                </div>
                <Form.Range
                  value={downPayment}
                  min={0}
                  max={pAmount}
                  onChange={handleChangeSliderDownPayment}
                />
                <div className={styles.emiLoanamountCalculatorBelow}>
                  <p>{currency} 0</p>
                  <p>{currency} {pAmount && pAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                </div>
              </div>

              <div className={styles.divContentBelow}>
                <p className={styles.processPara}>Finance with MoatamadCars</p>
                <div className="process-para-ul-tag" style={{ marginBottom: '0px' }}>
                  <li>Lowest possible interest rate</li>
                  <li>Lowest possible down payment</li>
                  <li>Choice of over 10 banks</li>
                  <li>We will tailor your loan to suit your budget</li>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default EmiCalculator