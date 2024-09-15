import 'package:flutter/material.dart';
import 'package:rideok/models/profile_model.dart';
import 'package:rideok/serrvices/api_service.dart';

class AuthProvider extends ChangeNotifier {
  ApiService _apiService = ApiService();
  ProfileModel? _profileModel;

  ProfileModel? get profileModel => _profileModel;
  set setProfileModel(ProfileModel profileModel) {
    _profileModel = profileModel;
    notifyListeners();
  }

  Future<void> getProfileFromUid(String uid) async {
    final response = await _apiService.getProfile(uid);
    setProfileModel = response;
  }

  AuthProvider() {
    getProfileFromUid("66e6f762c5e2860765442c26");
  }
}
