package com.food_recipe.service.user;

import com.food_recipe.dto.user.request.ChangePublicProfileDTO;
import com.food_recipe.entity.user.RegistrationUserToken;
import com.food_recipe.entity.user.ResetPasswordToken;
import com.food_recipe.entity.user.User;
import com.food_recipe.entity.user.UserStatus;
import com.food_recipe.event.OnResetPasswordViaEmailEvent;
import com.food_recipe.event.OnSendRegistrationUserConfirmViaEmailEvent;
import com.food_recipe.exception.CommonException;
import com.food_recipe.repository.RegistrationUserTokenRepository;
import com.food_recipe.repository.ResetPasswordTokenRepository;
import com.food_recipe.repository.UserRepository;
import com.food_recipe.service.mail.SendMailService;
import com.food_recipe.service.point.IPointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
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

	@Autowired
	private SendMailService sendMailService;

	@Autowired
	private IPointService pointService;

	@Override
	public void createUser(User user) {
		checkEmailExists(user.getEmail());
		checkUsernameExists(user.getUsername());
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
	public boolean existsUserByUsername(String username) {

		return userRepository.existsByUsername(username);
	}

	@Override
	public void activeUser(String token) {
		// get token
		RegistrationUserToken registrationUserToken = registrationUserTokenRepository.findByToken(token);

		// active user
		User user = registrationUserToken.getUser();
		user.setStatus(UserStatus.ACTIVE);
		User activatedUser = userRepository.save(user);

		// add user point
		Integer earnedPoints = 1000;
		pointService.createPoint(activatedUser, earnedPoints);
		pointService.logRegisterAccount(activatedUser, earnedPoints);

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
	public User ChangePublicProfileDTO(String username, ChangePublicProfileDTO dto) {
		User user = userRepository.findByUsername(username);

		user.setFirstName(dto.getFirstName());
		user.setLastName(dto.getLastName());
		user.setBirthDate(dto.getBirthDate());
		user.setGender(dto.getGender());
		user.setPhone(dto.getPhone());
		// user.setAvatarUrl(dto.getAvatarUrl());

		return userRepository.save(user);
	}

	public void forgotPassword(String email) {
		User user = userRepository.findByEmail(email);
		if (user != null) {
			final String newToken = UUID.randomUUID().toString();
			ResetPasswordToken token = new ResetPasswordToken(newToken, user);
			resetPasswordTokenRepository.save(token); // lưu token vào data
			sendMailService.sendForgotPassword(user.getEmail(), newToken);
		}
	}

	@Transactional
	@Override
	public String deleteAvatarForUser (User user) {
		if (user.getAvatarUrl() == null) {
			throw new CommonException("Avatar does not exist!");
		}

		user.setAvatarUrl(null);
		userRepository.save(user);

		return "Delete avatar successfully!";
	}

	@Override
	public void checkEmailExists(String email) {
		if(existsUserByEmail(email)){
			throw new CommonException("This email already exists, please enter another email address!");
		}
	}

	@Override
	public void checkUsernameExists(String username) {
		if(existsUserByUsername(username)){
			throw new CommonException("This username already exists, please enter another username!");
		}
	}

	@Override
	public void save(User user) {
		if(user != null){
			userRepository.save(user);
		}
	}

	@Transactional
	@Override
	public void updateUserAvatar(User user, String newAvatar) {
			if (newAvatar == null || newAvatar.trim().isEmpty()) {
				throw new CommonException("New avatar url cannot be empty!");
			}

			user.setAvatarUrl(newAvatar.trim());
			userRepository.save(user);
	}

}
