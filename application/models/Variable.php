<?php
class Variable extends CI_Model
{
    private $table = "variables";
 
    public function loadVariableApplication()
    {
        return $this->db->get($this->table)->result();
    }
}
?>