<!-- authentication -->

GET|HEAD api/user  ----------> get user info (return user) if user is authenticated if not abort error
POST email/verification-notification
POST forgot-password
POST login 
POST logout  
POST register 
POST reset-password 
GET|HEAD sanctum/csrf-cookie  ------> get csrf and sactum_id as cookies
GET|HEAD verify-email/{id}/{hash}
