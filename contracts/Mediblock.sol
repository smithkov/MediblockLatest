pragma solidity ^0.4.18;

contract Mediblock {

    struct Patient {

        string fName;
        string lName;
        string gender;
        string phone;
        string email;
        string _uaddress;
        string dob;
    }
    struct PatientResult {
        string result;
    }

    mapping (address => Patient) patients;
    mapping (address => PatientResult) results;

    address[] public patientAccts;
    address[] public PatientResultAcct;

    function setPatient(address _address, string _fName, string _lName, string _gender, string _phone, string _email, string _haddress, string _dob) public {
        var patient = patients[_address];


        patient.fName = _fName;
        patient.lName = _lName;
        patient.gender = _gender;
        patient.phone = _phone;
        patient.email= _email;
        patient._uaddress = _haddress;
        patient.dob = _dob;

        patientAccts.push(_address) -1;
    }
    function setPatientResult(address _address, string _result) public {
        var testResult = results[_address];

        testResult.result = _result;
        PatientResultAcct.push(_address) -1;
    }

    function getPatients() view public returns(address[]) {
        return patientAccts;
    }

    function getPatient(address _address) view public returns (string, string,string, string,string, string, string) {
        return (patients[_address].fName, patients[_address].lName, patients[_address].gender, patients[_address].phone,  patients[_address].email, patients[_address]._uaddress, patients[_address].dob);
    }

    function getPatientTest(address _address) view public returns (string) {
        return (results[_address].result);
    }

    function countPatients() view public returns (uint) {
        return patientAccts.length;
    }

}
