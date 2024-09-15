import 'package:json_annotation/json_annotation.dart';

part 'profile_model.g.dart';

@JsonSerializable()
class ProfileModel {
  @JsonKey(name: '_id')
  final String id;
  final String name;
  final String email;
  final String phone;
  final List<String> role;
  @JsonKey(name: "profile_photo")
  final String profilePhoto;
  final Map<String, dynamic>? vehicle;
  @JsonKey(name: 'saved_locations')
  final List<Map<String, dynamic>?> savedLocations;
  final String createdAt;
  final String updatedAt;
  final String token;

  ProfileModel({
    required this.id,
    required this.name,
    required this.email,
    required this.phone,
    required this.role,
    required this.profilePhoto,
    required this.vehicle,
    required this.savedLocations,
    required this.createdAt,
    required this.updatedAt,
    required this.token,
  });

  factory ProfileModel.fromJson(Map<String, dynamic> json) =>
      _$ProfileModelFromJson(json);

  Map<String, dynamic> toJson() => _$ProfileModelToJson(this);
}
