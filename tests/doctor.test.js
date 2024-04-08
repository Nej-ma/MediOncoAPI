import request from 'supertest';
import app from '../src/app.js';
import Doctor from '../src/models/doctorModel.js';

// Mock data
const doctorData = new Doctor(1, 'Doe', 'John', 'Cardiology', '1234567890', null, 1);

// Login before running tests
let token;



let server;
beforeAll((done) => {
    request(app)
        .post('/users/login')
        .send({
            username: 'admin', 
            password: 'A'
        })
        .end((err, response) => {
            token = response.body.token; // save the token!
            // Start server on a random available port
            server = app.listen(0, () => {
                const port = server.address().port;
                global.agent = request.agent(server); // Use this agent for requests in your tests
                done();
            });
        });
});



describe('GET /doctors', () => {
  it('should return all doctors', async () => {
    const res = await request(app)
      .get('/doctors')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });
});
  
describe('GET /doctors/:id', () => {
  it('should return a doctor by id', async () => {
    const res = await request(app)
      .get(`/doctors/${doctorData.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(typeof res.body).toBe('object');
    expect(res.body).toHaveProperty('id', doctorData.id);
  });
});

/*import { Router } from 'express';
const router = Router();
import { getAllSpecialties, getDoctorsBySpecialty, getAllDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor } from '../controllers/doctorController.js';
import authenticateToken from '../middleware/authenticateToken.js';
import authorizeRole from '../middleware/authorizeRole.js';

router.get('/specialty', authenticateToken, getAllSpecialties);
router.get('/specialty/:specialty', authenticateToken, getDoctorsBySpecialty);
router.get('/', authenticateToken, getAllDoctors);
router.get('/:id', authenticateToken, getDoctorById);
router.post('/', authenticateToken, authorizeRole('admin'), createDoctor);
router.put('/:id', authenticateToken, authorizeRole('admin'), updateDoctor);
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteDoctor);

export default router;
import { Router } from 'express';
const router = Router();
import { getAllSpecialties, getDoctorsBySpecialty, getAllDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor } from '../controllers/doctorController.js';
import authenticateToken from '../middleware/authenticateToken.js';
import authorizeRole from '../middleware/authorizeRole.js';

router.get('/specialty', authenticateToken, getAllSpecialties);
router.get('/specialty/:specialty', authenticateToken, getDoctorsBySpecialty);
router.get('/', authenticateToken, getAllDoctors);
router.get('/:id', authenticateToken, getDoctorById);
router.post('/', authenticateToken, authorizeRole('admin'), createDoctor);
router.put('/:id', authenticateToken, authorizeRole('admin'), updateDoctor);
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteDoctor);

export default router;
*/



describe('PUT /doctors/:id', () => {
    it('should update a doctor', async () => {
        const res = await request(app)
        .put(`/doctors/${doctorData.id}`)
        .send({ name: 'Jane' })
        .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    });
    }
);



// Close the server after all tests


afterAll(done => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });
