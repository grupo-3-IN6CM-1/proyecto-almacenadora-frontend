import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Spinner, Alert, Form, Button, Row, Col, InputGroup, Card, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserDetails } from '../../shared/hooks';
import { Navbar } from '../../components/navbars/Navbar';
import { validateStock } from '../../shared/validators/validateStockProduct';
import '../kardex/kardexPage.css';

export const KardexPage = () => {
  const { token: hookToken } = useUserDetails();
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const token = hookToken || storedUser.token || '';
  const authConfig = { headers: { 'x-token': token } };

  const [entries, setEntries] = useState([]);
  const [loadingEntries, setLoadingEntries] = useState(true);
  const [errorEntries, setErrorEntries] = useState(null);

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({ productId: '', quantity: '', reason: '', destination: '' });
  const [validated, setValidated] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoadingEntries(true);
    axios.get('http://localhost:3001/Almacenadora/v1/kardex', authConfig)
      .then(res => {
        const data = Array.isArray(res.data.kardex) ? res.data.kardex : [];
        setEntries(data.filter(r => r.action === 'entry'));
        setErrorEntries(null);
      })
      .catch(() => setErrorEntries('Error al cargar entradas.'))
      .finally(() => setLoadingEntries(false));
  }, [token]);

  useEffect(() => {
    setLoadingProducts(true);
    const params = searchTerm ? { params: { name: searchTerm } } : {};
    axios.get('http://localhost:3001/Almacenadora/v1/product/buscar', { ...authConfig, ...params })
      .then(res => {
        setProducts(Array.isArray(res.data.products) ? res.data.products : []);
        setErrorProducts(null);
      })
      .catch(() => setErrorProducts('Error al buscar productos.'))
      .finally(() => setLoadingProducts(false));
  }, [token, searchTerm]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);
    const qty = Number(formData.quantity);
    const stockError = validateStock(products, formData.productId, qty);
    if (stockError) {
      setSubmitError(stockError);
      return;
    }
    setSubmitLoading(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    axios.post('http://localhost:3001/Almacenadora/v1/kardex/salida', { ...formData, quantity: qty }, authConfig)
      .then(() => setSubmitSuccess(true))
      .catch(() => setSubmitError('Error al registrar salida.'))
      .finally(() => setSubmitLoading(false));
  };

  const handleGenerateReport = () => {
    axios.get('http://localhost:3001/Almacenadora/v1/report/kardex-report', { ...authConfig, responseType: 'blob' })
      .then(res => {
        const blob = new Blob([res.data], { type: res.data.type });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'kardex-report.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch(() => alert('Error al generar reporte.'));
  };

  return (
    <>
      <Navbar />
      <Container className="kardex-page py-4">
        <h2>Entradas de Productos</h2>
        {loadingEntries ? (
          <Spinner animation="border" />
        ) : errorEntries ? (
          <Alert variant="danger">{errorEntries}</Alert>
        ) : (
          <Table striped bordered hover variant="dark" responsive className="entries-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Fecha</th>
                <th>Cantidad</th>
                <th>Empleado</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(entry => (
                <tr key={entry.id} onClick={() => navigate(`/kardex/${entry.id}`)} className="entry-row">
                  <td>{entry.product?.name || '-'}</td>
                  <td>{new Date(entry.date).toLocaleDateString()}</td>
                  <td>{entry.quantity}</td>
                  <td>{`${entry.employee.name} ${entry.employee.surname}`}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <div className="exit-container">
          <Card className="exit-card">
            <Card.Body>
              <Card.Title>Registrar Salida de Producto</Card.Title>
              {submitSuccess && <Alert variant="success">Salida registrada correctamente.</Alert>}
              {submitError && <Alert variant="danger">{submitError}</Alert>}
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Buscar Producto</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre del producto..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Producto Disponible</Form.Label>
                  <Form.Select
                    required
                    value={formData.productId}
                    onChange={e => setFormData({ ...formData, productId: e.target.value })}
                    disabled={loadingProducts}
                  >
                    <option value="">-- Seleccione un producto --</option>
                    {products.map(p => (
                      <option key={p._id} value={p._id}>{p.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Cantidad</Form.Label>
                      <Form.Control
                        type="number"
                        required
                        min={1}
                        value={formData.quantity}
                        onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                        disabled={!formData.productId}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Destino</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Opcional"
                        value={formData.destination}
                        onChange={e => setFormData({ ...formData, destination: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Motivo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Opcional"
                    value={formData.reason}
                    onChange={e => setFormData({ ...formData, reason: e.target.value })}
                  />
                </Form.Group>

                <div className="form-footer">
                  <Button type="submit" disabled={submitLoading || loadingProducts}>
                    {submitLoading ? '...' : 'Registrar Salida'}
                  </Button>
                  <Button
                    variant="secondary"
                    className="report-btn"
                    onClick={handleGenerateReport}
                    disabled={entries.length === 0}
                  >
                    Generar Reporte
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
};
