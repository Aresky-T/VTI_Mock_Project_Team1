package com.food_recipe.controller;

import com.food_recipe.dto.ChangePublicProfileDTO;
import com.food_recipe.dto.ProfileDTO;
import com.food_recipe.dto.UserAvatarUpdate;
import com.food_recipe.dto.UserDTO;
import com.food_recipe.dto.UserFormForCreating;
import com.food_recipe.entity.User;
import com.food_recipe.service.IUserService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/users")
@Validated
public class UserController {

	@Autowired
	private IUserService userService;

	@Autowired
	private ModelMapper modelMapper;

	@GetMapping(value = "/email/{email}")
	public  ResponseEntity<?> existsUserByEmail(@PathVariable(name = "email") String email) {
		// get entity
		boolean result = userService.existsUserByEmail(email);

		// return result
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@GetMapping(value = "/username/{username}")
	public ResponseEntity<?> existsByUsername(@PathVariable(name = "username") String userName){
		// get entity
		boolean result = userService.existsUserByUsername(userName);

		// return result
		return new ResponseEntity<>(result, HttpStatus.OK);
	}


	@PostMapping()
	public ResponseEntity<?> createUser(@RequestBody @Valid UserFormForCreating dto){

		// create User
		userService.createUser(dto.toEntity());

		return new ResponseEntity<>("We have sent an email to you. Please check your email to activate account!", HttpStatus.OK);
	}

	@GetMapping("/activeUser")
	// validate: check exists, check not expired
	public ResponseEntity<?> activeUserViaEmail(@RequestParam String token) {

		// active user
		userService.activeUser(token);

		return new ResponseEntity<>("Active Success!", HttpStatus.OK);
	}

	// resend confirm
	@GetMapping("/userRegistrationConfirmRequest")

	// validate: email exists, email not active
	public ResponseEntity<?> sendConfirmUserRegistrationViaEmail(@RequestParam String email){
		userService.sendConfirmUserRegistrationViaEmail(email);

		return new ResponseEntity<>("We have sent an email to you. Please check your email to activate account!", HttpStatus.OK);
	}

	// reset password confirm
	@GetMapping("/resetPassword/request")
	// validate: email exists, email not active
	public ResponseEntity<?> sendResetPasswordViaEmail(@RequestParam String email) {

		userService.resetPasswordViaEmail(email);

		return new ResponseEntity<>("We have sent an email. Please check email to reset password!", HttpStatus.OK);
	}

	// resend reset password
	@GetMapping("/resetPassword/resend")
	// validate: email exists, email not active
	public ResponseEntity<?> resendResetPasswordViaEmail(@RequestParam String email){
		userService.sendResetPasswordViaEmail(email);

		return new ResponseEntity<>("We have sent an email. Please check email to reset password!", HttpStatus.OK);
	}

//	@GetMapping("/getPointsByUser")
//	public ResponseEntity<?> findPointsByUser(@RequestParam String username){
//		return new ResponseEntity<>(userService.findPointByUserName(username), HttpStatus.OK);
//	}

	@GetMapping("/profile")
	// validate: check exists, check not expired
	public ResponseEntity<?> getUserProfile(Authentication authentication) {

		// get username from token
		String username = authentication.getName();

		// get user info
		User user = userService.findUserByUsername(username);
		UserDTO dto = modelMapper.map(user, UserDTO.class);
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}

	@PutMapping("/profile")
	//validate: check exists, check not expired
	public ResponseEntity<?> changeUserProfile(Authentication authentication, @RequestBody ChangePublicProfileDTO dto){

		// get username from token
		String username = authentication.getName();

		User user = userService.ChangePublicProfileDTO(username, dto);
		UserDTO profile = modelMapper.map(user, UserDTO.class);

		return new ResponseEntity<>(profile, HttpStatus.OK);
	}

	@PutMapping("/profile/avatar")
	public ResponseEntity<?> changeUserAvatar(@RequestBody UserAvatarUpdate form){
		User response = userService.updateUserAvatar(form.getUserId(), form.getAvatar());
		return new ResponseEntity<>(response.getAvatarUrl(), HttpStatus.OK);
	}

	@PostMapping("/forgot/{email}")
	public void forgotPassword(@PathVariable String email) {
		userService.forgotPassword(email);
	}


	@PostMapping("/resetPassword")
	// validate: check exists, check not expired
	public ResponseEntity<?> resetPasswordViaEmail(@RequestParam String token, @RequestParam String newPassword){
		//reset password
		userService.resetPassword(token, newPassword);

		return new ResponseEntity<>("Reset Password success!", HttpStatus.OK);
	}

	@PutMapping("/delete-avatar/{userId}")
	public ResponseEntity<?> deleteAvatar(@PathVariable Integer userId) {
		String response = userService.deleteAvatarForUser(userId);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

}
