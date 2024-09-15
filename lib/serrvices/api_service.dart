import 'package:dio/dio.dart';
import 'package:rideok/models/profile_model.dart';

final dio = Dio(
  BaseOptions(
    baseUrl: 'http://10.0.2.2:8000/api',
  ),
);

class ApiService {
  Future<ProfileModel> getProfile(String uid) async {
    final response = await dio.get(
      '/user',
      queryParameters: {'uid': uid},
    );

    return ProfileModel.fromJson(response.data);
  }
}
