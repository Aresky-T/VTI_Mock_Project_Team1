package com.food_recipe.service;


import com.food_recipe.dto.ChangePublicProfileDTO;
import com.food_recipe.entity.*;
import com.food_recipe.event.OnResetPasswordViaEmailEvent;
import com.food_recipe.event.OnSendRegistrationUserConfirmViaEmailEvent;
import com.food_recipe.repository.RegistrationUserTokenRepository;
import com.food_recipe.repository.ResetPasswordTokenRepository;
import com.food_recipe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Component
@Transactional
public class UserService implements IUserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RegistrationUserTokenRepository registrationUserTokenRepository;

	@Autowired
	private ApplicationEventPublisher eventPublisher;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private ResetPasswordTokenRepository resetPasswordTokenRepository;


	@Override
	public void createUser(User user) {
		// encode password
		user.setPassword(passwordEncoder.encode(user.getPassword()));

		// create user
		userRepository.save(user);

		// create new user registration token
		createNewRegistrationUserToken(user);

		// send email to confirm
		sendConfirmUserRegistrationViaEmail(user.getEmail());
	}

	public void sendConfirmUserRegistrationViaEmail(String email) {
		eventPublisher.publishEvent(new OnSendRegistrationUserConfirmViaEmailEvent(email));
	}

	private void createNewRegistrationUserToken(User user) {
		// create new token for confirm Registration
		final String newToken = UUID.randomUUID().toString();
		RegistrationUserToken token = new RegistrationUserToken(newToken, user);

		registrationUserTokenRepository.save(token);
	}

	@Override
	public User findUserByEmail(String email) {

		return userRepository.findByEmail(email);
	}

	@Override
	public User findUserByUsername(String username) {

		return userRepository.findByUsername(username);
	}

	@Override
	public boolean existsUserByEmail(String email) {

		return userRepository.existsByEmail(email);
	}

	@Override
	public boolean existsUserByUsername(String username){

		return userRepository.existsByUsername(username);
	}

	@Override
	public void activeUser(String token) {
		// get token
		RegistrationUserToken registrationUserToken = registrationUserTokenRepository.findByToken(token);

		// active user
		User user = registrationUserToken.getUser();
		user.setStatus(UserStatus.ACTIVE);
		userRepository.save(user);

		// remove Registration User Token
		registrationUserTokenRepository.deleteById(registrationUserToken.getId());
	}

	@Override
	public void resetPasswordViaEmail(String email) {

		// find user by email
		User user = findUserByEmail(email);

		// remove token token if exists
		resetPasswordTokenRepository.deleteByUserId(user.getId());

		// create new reset password token
		createNewResetPasswordToken(user);

		// send email
		sendResetPasswordViaEmail(email);
	}

	@Override
	public void sendResetPasswordViaEmail(String email) {
		eventPublisher.publishEvent(new OnResetPasswordViaEmailEvent(email));
	}

	private void createNewResetPasswordToken(User user) {

		// create new token for Reseting password
		final String newToken = UUID.randomUUID().toString();
		ResetPasswordToken token = new ResetPasswordToken(newToken, user);

		resetPasswordTokenRepository.save(token);
	}

	@Override
	public void resetPassword(String token, String newPassword) {
		// get token
		ResetPasswordToken resetPasswordToken = resetPasswordTokenRepository.findByToken(token);

		// change password
		User user = resetPasswordToken.getUser();
		user.setPassword(passwordEncoder.encode(newPassword));
		userRepository.save(user);

		// remove Reset Password
		resetPasswordTokenRepository.deleteById(resetPasswordToken.getResetID());

	}


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// Check user exists by username
		User user = userRepository.findByUsername(username);

		if(user == null) {
			throw new UsernameNotFoundException(username);
		}

		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				AuthorityUtils.createAuthorityList(user.getUsername()));
	}

	@Override
	public void ChangePublicProfileDTO(String username, ChangePublicProfileDTO dto) {
		User user = userRepository.findByUsername(username);

		user.setFirstName(dto.getFirstName());
		user.setLastName(dto.getLastName());
		user.setBirthDate(dto.getBirthDate());
		user.setGender(dto.getGender());
		user.setPhone(dto.getPhone());
		user.setAvatarUrl(dto.getAvatarUrl());

		userRepository.save(user);
	}

}
