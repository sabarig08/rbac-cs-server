const db=require('../config/db')

async function getEmployees(req, res) {
  try {
    const [rows] = await db.query('SELECT id, name, department, salary FROM  rbac.employees');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createEmployee(req,res) {
    const {name,department,salary}=req.body;

    try{
        const[result]=await db.query(
            'INSERT INTO rbac.employees (name, department, salary) VALUES (?, ?, ?)',
             [name,department,salary]
        );
        res.json({ message: 'Employee created', id: result.insertId });
    } catch(err) {
        res.status(500).json({error:err.message});
    }
    
}


async function updateEmployee(req, res) {
  const { id } = req.params;
  const { name, department, salary } = req.body;
  try {
    await db.query(
      'UPDATE rbac.employees SET name=?, department=?, salary=? WHERE id=?',
      [name, department, salary, id]
    );
    res.json({ message: 'Employee updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteEmployee(req, res) {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM rbac.employees WHERE id=?', [id]);
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getEmployees, createEmployee, updateEmployee, deleteEmployee };